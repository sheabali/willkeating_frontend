/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";

// interface FuneralNoticeProps {
//   data: {
//     name: string;
//     dateOfBirth: string;
//     dateOfPassing: string;
//     funeralLocation: string;
//     funeralDate: string;
//     funeralTime: string;
//     images: string[];
//     createdBy: {
//       fullName: string;
//       image?: string;
//     };
//   };
// }

export default function FuneralNotice({ data }: any) {
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
          <h1 className="text-5xl md:text-6xl text-black tracking-tight mb-3">
            {data.name}
          </h1>
          <div className="flex items-center justify-center gap-8 text-lg text-zinc-600">
            <div>
              <span className="text-sm block text-zinc-500">Born</span>
              {formatDate(data.dateOfBirth)}
            </div>
            <div className="w-px h-10 bg-zinc-700" />
            <div>
              <span className="text-sm block text-zinc-500">Passed Away</span>
              {formatDate(data.dateOfPassing)}
            </div>
          </div>
        </div>

        {/* Main Image */}
        {/* Main Image */}
        {data.images && data.images.length > 0 && (
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-[600px] aspect-4/5 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">
              <Image
                src={data.images[0]}
                alt={`${data.name} - Funeral Notice`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 600px"
              />

              {/* Elegant overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

              {/* Optional subtle inner shadow for depth */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/40" />
            </div>
          </div>
        )}

        {/* Funeral Details */}
        <Card className="border-zinc-800 mb-8">
          {/* <CardHeader className="text-center pb-8">
            <h2 className="text-3xl font-serif text-white">Funeral Service</h2>
          </CardHeader> */}
          <CardContent className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-[#8060a0]" />
              </div>
              <p className="text-sm text-zinc-500 mb-1">DATE</p>
              <p className="text-xl font-medium">
                {formatDate(data.funeralDate)}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full mb-4">
                <Clock className="w-8 h-8 text-[#8060a0]" />
              </div>
              <p className="text-sm text-zinc-500 mb-1">TIME</p>
              <p className="text-xl font-medium">{data.funeralTime}</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-[#8060a0]" />
              </div>
              <p className="text-sm text-zinc-500 mb-1">LOCATION</p>
              <p className="text-xl font-medium leading-tight">
                {data.funeralLocation}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rest in Peace Message */}
        <div className="text-center py-8 border-y border-zinc-800">
          <p className="text-2xl text-black">
            May their soul rest in eternal peace
          </p>
        </div>

        {/* Created By */}
        <div className="mt-10 flex items-center justify-center gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            {data.createdBy.image && (
              <Image
                src={data.createdBy.image}
                alt={data.createdBy.fullName}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div>
              Notice created by{" "}
              <span className="text-zinc-400">{data.createdBy.fullName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
