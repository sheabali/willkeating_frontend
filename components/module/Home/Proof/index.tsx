"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion, Variants } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const Proof = () => {
  const verified = [
    "Eat up technician hours",
    "Lead to misdiagnosis",
    "Come back after the repair",
    "Slow down bay productivity",
    "Turn profitable jobs into lost time",
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      role: "Family Member",
      image: "/images/user_2.png",
      review:
        "The peaceful setting and caring staff helped our family create a beautiful celebration of life. It was exactly what we needed during such an emotional time.",
    },
    {
      id: 2,
      name: "James R.",
      role: "Memorial Service Attendee",
      image: "/images/user_3.png",
      review:
        "Everything was thoughtfully arranged, allowing us to focus on honoring our loved one and sharing meaningful memories together.",
    },
    {
      id: 3,
      name: "Emily T.",
      role: "Daughter",
      image: "/images/user_2.png",
      review:
        "From the first conversation to the final gathering, the team showed genuine compassion and attention to every detail.",
    },
    {
      id: 4,
      name: "Michael L.",
      role: "Family Organizer",
      image: "/images/attachment.png",
      review:
        "The venue provided a warm and welcoming atmosphere where family and friends could come together to celebrate a life well lived.",
    },
    {
      id: 5,
      name: "Jennifer K.",
      role: "Granddaughter",
      image: "/images/user_3.png",
      review:
        "We wanted a celebration that reflected my grandmother's personality, and they helped us create something truly memorable and personal.",
    },
    {
      id: 6,
      name: "Robert H.",
      role: "Community Member",
      image: "/images/attachment_three.png",
      review:
        "The service was handled with dignity and respect. Every guest felt supported, and the experience brought comfort to our entire family.",
    },
    {
      id: 7,
      name: "Linda G.",
      role: "Family Friend",
      image: "/images/user_3.png",
      review:
        "It felt less like a formal ceremony and more like a heartfelt gathering where stories, laughter, and cherished memories were shared.",
    },
    {
      id: 8,
      name: "David P.",
      role: "Son",
      image: "/images/attachment_two.png",
      review:
        "Their guidance made a difficult process much easier. We were able to focus on celebrating my father's life instead of worrying about logistics.",
    },
    {
      id: 9,
      name: "Karen W.",
      role: "Memorial Coordinator",
      image: "/images/attachment_three.png",
      review:
        "The attention to detail was exceptional. Every element of the event reflected the love and respect we wanted to express.",
    },
    {
      id: 10,
      name: "Olivia S.",
      role: "Family Member",
      image: "/images/attachment.png",
      review:
        "A truly meaningful place where families can gather, remember, and find comfort while celebrating the lives of those they hold dear.",
    },
  ];

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
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <div className="flex justify-end items-end mb-10">
              <div className="flex gap-3">
                <CarouselPrevious className="static translate-y-0 bg-white hover:bg-[#8B2323] hover:text-white transition-all duration-300 border-gray-200 shadow-sm size-12" />
                <CarouselNext className="static translate-y-0 bg-white hover:bg-[#8B2323] hover:text-white transition-all duration-300 border-gray-200 shadow-sm size-12" />
              </div>
            </div>

            <CarouselContent className="-ml-4">
              {reviews.map((review) => (
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
                        <Star /> <span> 5/5</span>
                      </div>
                      <div>1/10</div>
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
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center text-center"
        ></motion.div>
      </div>
    </section>
  );
};

export default Proof;
