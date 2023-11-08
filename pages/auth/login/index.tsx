import Input from "@/components/shared/Input/Input";
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
    console.log(data);
    cookies.set("myCat", "Pacman");
  };
  console.log(cookies.get("myCat"));
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
