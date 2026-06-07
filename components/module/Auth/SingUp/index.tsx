/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PHInput from "@/components/form/NRInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useRegisterMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type RegisterFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const payload = {
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    };

    try {
      const res = (await register(payload).unwrap()) as any;

      if (res.success) {
        toast.success(res.message || "Account created successfully");
        router.push("/login");
      } else {
        toast.error(res.message || "Registration failed");
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
      <div className="relative w-full max-w-[676px] rounded-lg bg-white p-16 shadow-md z-10">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={250}
            height={250}
            className="mx-auto w-[116px] h-[116px] rounded-2xl"
          />
        </Link>

        <h1 className="text-center text-[#1B1C1C] text-[32px] mt-4">Sign Up</h1>

        <p className="text-center text-[#1B1C1C] text-[16px] mt-2">
          Enter your information below to create an account
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-8"
          >
            <PHInput
              control={form.control}
              name="fullName"
              label="Full Name"
              icon={Mail}
              type="text"
              placeholder="Your full name"
            />
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
              name="phoneNumber"
              label="Phone Number"
              icon={Phone}
              type="tel"
              placeholder="Your phone number"
            />

            <PHInput
              control={form.control}
              name="password"
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Enter password"
            />

            <PHInput
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              icon={Lock}
              type="password"
              placeholder="Confirm password"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full text-[20px] py-6"
            >
              <Link href="/login" className="w-full text-[20px] py-6">
                {isLoading ? <Spinner /> : "Sign Up"}
              </Link>
            </Button>

            <p className="text-center text-[#5B5C57] text-[18px]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#052858] font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default RegisterPage;
