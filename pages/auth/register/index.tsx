import Input from "@/components/shared/Input/Input";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
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
      <div className="w-1/2 mx-auto my-10 bg-white p-10">
        <div className="flex justify-between items-center">
          <p>Create your Flip Dash Account</p>
          <p>
            Already member?{" "}
            <Link href="/auth/login" className="text-secondary">
              Login
            </Link>{" "}
            here
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("name")}
            type="text"
            placeholder="Enter your name"
            className="mt-4 w-full"
          />
          <Input
            register={register("email")}
            type="email"
            placeholder="Enter your email"
            className="mt-4 w-full"
          />
          <Input
            type="password"
            placeholder="Enter your password"
            register={register("password")}
            className="my-4 w-full"
          />
          <Input
            type="submit"
            value="Sign up"
            className="cursor-pointer w-full bg-secondary hover:bg-opacity-70 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
