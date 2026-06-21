/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

// interface DeathNoticeProps {
//   data: {
//     name: string;
//     dateOfBirth: string;
//     dateOfPassing: string;
//     location: string;
//     story: string;
//     images: string[];
//     createdBy: {
//       fullName: string;
//       image?: string;
//     };
//   };
// }

export default function DeathNotice({ data }: any) {
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  return (
    <div className="min-h-screen text-zinc-200 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 text-sm tracking-widest">
            IN LOVING MEMORY
          </Badge>

          <h1 className="text-5xl md:text-6xl font-serif text-black tracking-tight mb-4">
            {data.name}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg text-zinc-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-sm text-zinc-500 block">Born</span>
                {formatDate(data.dateOfBirth)}
              </div>
            </div>

            <div className="hidden sm:block w-px h-12 bg-zinc-700" />

            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-sm text-zinc-500 block">Passed Away</span>
                {formatDate(data.dateOfPassing)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Portrait Image */}
        {data.images && data.images.length > 0 && (
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-[560px] aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
              <Image
                src={data.images[0]}
                alt={`${data.name} - Death Notice`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/30" />
            </div>
          </div>
        )}

        {/* Location */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-zinc-800">
            <MapPin className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-zinc-700">PLACE OF REST</p>
              <p className="text-xl font-medium text-black">{data.location}</p>
            </div>
          </div>
        </div>

        {/* Obituary / Story */}
        <Card className=" border-zinc-800 mb-12">
          <CardHeader>
            <h2 className="text-3xl font-serif text-center text-black">
              Obituary
            </h2>
          </CardHeader>
          <CardContent>
            <div className="prose prose-zinc prose-invert max-w-none text-[#1a1b1b] leading-relaxed">
              {data.story ? (
                <p className="whitespace-pre-line text-lg">{data.story}</p>
              ) : (
                <p className="text-center italic text-zinc-500">
                  No obituary text available.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Rest in Peace */}
        <div className="text-center py-10 border-y border-zinc-800">
          <p className="text-3xl text-black tracking-wide">
            May her soul rest in eternal peace
          </p>
        </div>

        {/* Created By */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-4 text-sm text-zinc-500  px-6 py-3 rounded-2xl border border-zinc-800">
            {data.createdBy.image && (
              <Image
                src={data.createdBy.image}
                alt={data.createdBy.fullName}
                width={40}
                height={40}
                className="rounded-full ring-2 object-contain w-10 h-10 ring-zinc-700"
              />
            )}
            <div className="flex flex-col">
              Death notice published by <br />
              <span className="text-zinc-800 font-medium">
                {data.createdBy.fullName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
