/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllFeedbackQuery } from "@/redux/api/feedbackApi";
import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

type ReviewCardData = {
  id: string;
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
};

const formatDate = (iso?: string) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const Proof = () => {
  const { data: reviewsData, isLoading } = useGetAllFeedbackQuery({}) as any;

  const apiReviews: ReviewCardData[] | undefined = reviewsData?.data?.length
    ? reviewsData.data.map((item: any) => ({
        id: item.id,
        name: item.user?.fullName || "Anonymous",
        role: formatDate(item.createdAt)
          ? `Reviewed ${formatDate(item.createdAt)}`
          : "Verified Review",
        image: item.user?.image || "/images/user_2.png",
        review: item.review,
        rating: item.rating ?? 5,
      }))
    : undefined;

  const reviewsList = apiReviews || [];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex justify-center text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-[36px] md:text-[48px] text-[#0D2B1D] leading-[1.1] mb-6">
                Real Experiences From <br />
                <span className="">Families and Friends</span>
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-[#5B5C57] flex justify-center text-[16px] md:text-[18px] leading-relaxed max-w-xl"
            >
              That’s real money back in your shop. SmartAutoTech helps you
              reduce wasted diagnostic time on vehicles that:
            </motion.p>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative"
        >
          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-4xl bg-gray-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <div className="flex justify-end items-end mb-10">
                <div className="flex gap-3">
                  <CarouselPrevious className="static translate-y-0 bg-white hover:bg-primary hover:text-white transition-all duration-300 border-gray-200 shadow-sm size-12" />
                  <CarouselNext className="static translate-y-0 bg-white hover:bg-primary hover:text-white transition-all duration-300 border-gray-200 shadow-sm size-12" />
                </div>
              </div>

              <CarouselContent className="-ml-4">
                {reviewsList.map((review) => (
                  <CarouselItem
                    key={review.id}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div
                      variants={cardVariants}
                      whileHover={{
                        y: -10,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                      }}
                      className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm relative group transition-all duration-300 h-full flex flex-col"
                    >
                      <div className="flex justify-between items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={
                                i < Math.round(review.rating)
                                  ? "fill-yellow-400 text-yellow-400 size-4"
                                  : "text-gray-200 size-4"
                              }
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-500">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>

                      <div className="mb-6 grow">
                        <p className="w-[85%] text-[#4F5655] text-lg leading-relaxed ">
                          {review.review}
                        </p>
                      </div>

                      <div className="flex gap-4 items-center mt-auto pt-6 border-t border-gray-50">
                        <div>
                          <Image
                            src={review.image}
                            alt={review.name}
                            width={200}
                            height={200}
                            className="w-14 h-14 rounded-full object-cover shadow-inner"
                          />
                        </div>
                        <div>
                          <p className="text-[19px] text-[#0D2B1D] font-bold">
                            {review.name}
                          </p>
                          <p className="text-[15px] text-gray-500 font-medium">
                            {review.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Proof;
