/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetSingleObituariesQuery } from "@/redux/api/obituariesApi";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Icon from "./icon";

function formatDate(dateString?: string) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function MemorialPage() {
  const { id } = useParams();
  const { data: memorialData, isLoading } = useGetSingleObituariesQuery(
    id,
  ) as any;

  const memorial = memorialData?.data;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-[#5B5C57]">Loading...</p>
      </main>
    );
  }

  const photo = memorial?.images?.[0];

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-2xl rounded-lg bg-[#8060A0] px-8 py-12 shadow-sm">
        <div className="flex flex-col items-center gap-8">
          {/* Name */}
          <h1 className="text-center text-[28px] font-semibold tracking-wide text-white">
            {memorial?.name}
          </h1>

          <div className="relative h-[194px] w-[194px]">
            <Icon />
            {/* Photo container */}
            <div className="relative -top-40 mx-auto z-10 h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md">
              <Image
                src={photo || "/images/Ellipse 6 (2).png"}
                alt={`Photo of ${memorial?.name ?? "the deceased"}`}
                fill
                className="object-cover grayscale"
                sizes="128px"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="text-center">
            <p className="text-[20px] text-[#ffffff]">
              {formatDate(memorial?.dateOfBirth)} –{" "}
              {formatDate(memorial?.dateOfPassing)}
            </p>
          </div>

          {/* Location */}
          {memorial?.location && (
            <div className="flex items-center justify-center gap-2 text-white">
              <MapPin size={20} />
              <span className="text-[20px] font-medium">
                {memorial.location}
              </span>
            </div>
          )}

          {/* Quote */}
          <div className="border-l-4 border-slate-300 pl-6">
            <blockquote className="text-center text-[24px] leading-relaxed text-[#ffffff]">
              <span className="text-3xl text-slate-400">&ldquo;</span>
              {memorial?.story}
              <span className="text-3xl text-slate-400">&rdquo;</span>
            </blockquote>
          </div>
        </div>
      </div>
    </main>
  );
}
