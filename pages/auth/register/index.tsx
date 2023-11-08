import Input from "@/components/shared/Input/Input";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
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
  };

  return (
    <div className="container mx-auto flex flex-col justify-center mt-4">
      <p>Sign up for better experience</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Input type="submit" value="Log in" className="cursor-pointer" />
      </form>
    </div>
  );
};

export default Signup;
