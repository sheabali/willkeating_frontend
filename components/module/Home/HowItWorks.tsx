import { FileText, Flower, Users } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      title: "Publish a Notice",
      description:
        "Share important information about your loved one and upcoming funeral arrangements.",
    },
    {
      icon: Flower,
      title: "Create a Memorial",
      description:
        "Build a dedicated space where memories, photos, and stories can be preserved.",
    },
    {
      icon: Users,
      title: "Bring Family Together",
      description:
        "Invite relatives and friends to share tributes, condolences, and cherished memories.",
    },
  ];

  return (
    <section className="w-full py-16 px-4 md:py-24">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className=" text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Publish important funeral information quickly, then create a lasting
            space where family and friends can come together to share memories,
            support, and tributes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border-2 border-primary">
                  <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className=" text-[28px] text-[#052858] md:text-2xl">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-[20px] text-[#5B5C57] md:text-[20px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
