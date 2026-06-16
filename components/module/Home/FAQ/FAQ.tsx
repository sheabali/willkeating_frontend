"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, type Variants } from "framer-motion";

const faqItems = [
  {
    id: "1",
    question: "How do I publish a death notice?",
    answer:
      "Creating a death notice is simple. Complete the submission form, add funeral details and important information, choose your preferred plan, and publish your notice for family, friends, and the community to view.",
  },
  {
    id: "2",
    question: "Can family and friends share memories?",
    answer: "Yes, family and friends can share memories on the memorial page.",
  },
  {
    id: "3",
    question: "Can I add photos to a memorial page?",
    answer: "Yes, you can add photos to a memorial page.",
  },
  {
    id: "4",
    question: "Can I update information after publishing?",
    answer: "Yes, you can update information after publishing.",
  },
  {
    id: "5",
    question: "How does the memorial subscription work?",
    answer:
      "Subscriptions renew automatically at the plan you choose, keeping the memorial page live and editable. You can switch plans or cancel at any time from your account settings.",
  },
  {
    id: "6",
    question: "Is my information secure?",
    answer:
      "Yes. Your details are encrypted in transit and at rest, and only used to publish and manage the notice you create — never sold or shared with third parties.",
  },
];

// Single set of variants reused by every animated element. Combined with
// staggerChildren on the parent, this replaces several independent
// whileInView observers with one, which is both cheaper to run and keeps
// the reveal visually in sync.
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FAQ() {
  return (
    <section className="relative overflow-hidden bg-[#F9FAFB] py-16 sm:py-20 lg:py-24">
      {/* Background decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-[10%] -top-[10%] h-[60%] w-[60%] rounded-full bg-blue-50/50 blur-3xl sm:h-[40%] sm:w-[40%]" />
        <div className="absolute -bottom-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-red-50/50 blur-3xl sm:h-[40%] sm:w-[40%]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-12"
        >
          <div className="flex flex-col items-start text-left">
            <motion.span
              variants={fadeUpVariants}
              className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#7E0A0A] sm:mb-6"
            >
              FAQ
            </motion.span>
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl font-bold leading-[1.1] tracking-tight text-[#1A1A1A] sm:text-4xl md:text-5xl"
            >
              Frequently Asked Questions
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUpVariants}
            className="max-w-2xl text-left text-base font-medium text-gray-500 sm:text-lg lg:text-right"
          >
            Find answers to common questions about publishing notices, creating
            memorial pages, subscriptions, privacy, and sharing memories with
            loved ones.
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-3 sm:space-y-4"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="group rounded-2xl border-none bg-white px-1 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] sm:px-4 sm:py-2 data-[state=open]:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
              >
                <AccordionTrigger className="flex-1 px-3 py-3 hover:no-underline sm:px-6 sm:py-4">
                  <div className="flex w-full items-center gap-3 text-left sm:gap-5">
                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-50 transition-colors group-hover:bg-blue-50 sm:flex sm:h-10 sm:w-10">
                      <span className="text-sm font-bold text-[#1A1A1A]">
                        {index + 1}
                      </span>
                    </div>
                    <span className="flex-1 text-base font-bold leading-tight tracking-tight text-[#1A1A1A] sm:text-lg md:text-xl">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-3 pb-5 pt-1 sm:px-6 sm:pb-6 sm:pt-2 lg:px-[72px]">
                  <div className="text-sm font-medium leading-relaxed text-gray-600 sm:text-base lg:text-lg">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
