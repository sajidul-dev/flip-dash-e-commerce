import Input from "@/components/shared/Input/Input";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Seller = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    if (data) {
      axios
        .post("/api/auth/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container mx-auto flex flex-col justify-center mt-4">
      <p>Become a Seller for no reason</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register("name")}
          type="text"
          placeholder="Enter your name"
          className="mt-4"
        />
        <Input
          register={register("email")}
          type="email"
          placeholder="Enter your email"
          className="mt-4"
        />
        <Input
          type="password"
          placeholder="Enter your password"
          register={register("password")}
          className="my-4"
        />
        <Input
          type="submit"
          value="Become a seller"
          className="cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Seller;
