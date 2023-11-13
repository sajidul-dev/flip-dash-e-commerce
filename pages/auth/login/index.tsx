import { SetCookies } from "@/components/shared/Cookies/Cookies";
import Input from "@/components/shared/Input/Input";
import Loading from "@/components/shared/Loading/Loading";
import { setSeller } from "@/redux/slice/sellerSlice/sellerSlice";
import { setUser } from "@/redux/slice/userSlice/userSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
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
            setLoading(false);
            router.push("/");
          } else {
            console.log(res.data);
            SetCookies("seller", res.data.shop);
            dispatch(setSeller(res.data.shop));
            setLoading(false);
            router.push("/");
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(`${err.response.data.message}`);
        });
    }
  };
  if (loading) {
    return <Loading loading={loading} />;
  }
  return (
    <div className="container mx-auto flex flex-col justify-center mt-4">
      <div className="w-1/2 mx-auto my-10 bg-white p-10">
        <div className="flex justify-between items-center">
          <p>Welcome to Flip Dash! Please login.</p>
          <p>
            New member?{" "}
            <Link href="/auth/register" className="text-secondary">
              Register
            </Link>{" "}
            here
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("email")}
            type="email"
            placeholder="Enter your email"
            className="mt-4 w-full"
          />
          <Input
            register={register("password")}
            type="password"
            placeholder="Enter your password"
            className="my-4 w-full"
          />
          <Input
            type="submit"
            value="Log in"
            className="cursor-pointer w-full bg-secondary hover:bg-opacity-70 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
