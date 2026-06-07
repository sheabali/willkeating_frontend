/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PHInput from "@/components/form/NRInput";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useLoginMutation } from "@/redux/api/authApi";
import { setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/src/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type LoginFormValues = {
  email: string;
  password: string;
};

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = (await login(data).unwrap()) as any;

      if (res.success) {
        const token = res.data.token;
        setCookie(token);

        const user = jwtDecode<CustomJwtPayload>(token);
        dispatch(setUser({ token, user }));

        toast.success(res.message || "Login successful!");

        if (user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(res.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.png')" }}
    >
      <div className="relative w-full max-w-[676px] max-h-[676px] rounded-lg bg-white p-16 shadow-md z-10">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={250}
            height={250}
            className="mx-auto w-[116px] h-[116px] rounded-2xl"
          />
        </Link>

        <h1 className="text-center text-[#1B1C1C] text-[32px] mt-4">Sign In</h1>
        <h1 className="text-center text-[#1B1C1C] text-[16px]">
          Enter your email and password below to sign in{" "}
        </h1>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mb-[60px] mt-6"
          >
            <PHInput
              control={form.control}
              name="email"
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="Your email address"
            />

            <PHInput
              control={form.control}
              name="password"
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Your password"
            />

            <div className="flex justify-start my-4">
              <Link
                href="/admin-forgot-password"
                className="text-[20px] text-[#052858] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-[24px] py-6"
            >
              {isLoading ? <Spinner /> : "Sign in"}
            </Button>

            <p className="text-center text-[#5B5C57] text-[20px] pb-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#052858] hover:underline">
                Create account
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginPage;
