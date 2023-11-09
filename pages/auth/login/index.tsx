import Input from "@/components/shared/Input/Input";
import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "universal-cookie";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const cookies = new Cookies();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    cookies.set("myCat", "Pacman");
    if (data) {
      axios
        .post("/api/auth/login", {
          email: data.email,
          password: data.password,
        })
        .then((res) => cookies.set("user", JSON.stringify(res.data.user)))
        .catch((err) => console.log(err));
    }
  };
  console.log(cookies.get("user")._id);
  return (
    <div className="container mx-auto flex flex-col justify-center mt-4">
      <p>Sign in for better experience</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register("email")}
          type="email"
          placeholder="Enter your email"
          className="mt-4"
        />
        <Input
          register={register("password")}
          type="password"
          placeholder="Enter your password"
          className="my-4"
        />
        <Input type="submit" value="Log in" className="cursor-pointer" />
      </form>
    </div>
  );
};

export default Login;
