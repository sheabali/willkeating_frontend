/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { ArrowLeft, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation() as any;

  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await forgotPassword(data).unwrap();

      console.log("Response:", res);

      toast.success(res.message || "OTP sent successfully");

      router.push(
        `/forgot-password/otp?email=${encodeURIComponent(data.email)}`,
      );
    } catch (error: any) {
      console.error(error);

      toast.error(error?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.png')" }}
    >
      <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8  w-full max-w-[676px] h-[676px] mx-auto my-auto flex flex-col gap-8">
        <div className="mb-6 text-center">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={250}
            height={250}
            className="mx-auto w-[116px] h-[116px] rounded-2xl"
          />

          <h2 className="text-[32px]  text-[#1B1C1C] mt-4 mb-2">
            Recover Access
          </h2>
          <p className="text-[#4B5563] text-[20px]">
            Enter your email for verification code
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#444748] text-[18px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        required
                        className="py-6 pl-12 rounded-full"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full text-[20px] font-semibold py-6 transition-colors"
              disabled={isSubmitting || isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Code"}
            </Button>
            <Link href="/login">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full text-[20px] font-semibold py-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}
