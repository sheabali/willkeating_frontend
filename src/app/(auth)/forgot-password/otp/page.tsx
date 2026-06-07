import Otp from "@/components/module/Auth/otp";
import Image from "next/image";

export default function ResetPassword() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/login.png')" }}
    >
      {/* Centered Card */}
      <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-2xl mx-4">
        <Image
          src="/Logo.png"
          alt="SmartAuto Logo"
          width={200}
          height={200}
          className="h-[116px] w-[116px] flex items-center justify-center mx-auto"
        />

        <Otp />
      </div>
    </div>
  );
}
