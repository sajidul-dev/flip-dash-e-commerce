import { SetCookies } from "@/components/shared/Cookies/Cookies";
import Input from "@/components/shared/Input/Input";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data) {
      axios
        .post("/api/auth/login", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          if (res.data.user) {
            SetCookies("user", res.data.user);
            dispatch(setUser(res.data.user));
            router.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };
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
