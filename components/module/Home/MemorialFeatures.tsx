import Image from "next/image";

interface FeatureCard {
  title: string;
  description?: string;
  icon: string;
}

const features: FeatureCard[] = [
  {
    title: "Photo Galleries",
    description: "Share cherished moments through beautiful photo collections",
    icon: "/images/PhotoGalleries.png",
  },
  {
    title: "Memory Wall",
    description: "A dedicated space for shared memories and stories",
    icon: "/images/MemoryWall.png",
  },
  {
    title: "Stories & Tributes",
    description:
      "Celebrate a life through personal anecdotes and heartfelt tributes",
    icon: "/images/StoriesTributes.png",
  },
  {
    title: "Condolence Messages",
    description: "Express sympathy and support with thoughtful messages",
    icon: "/images/CondolenceMessages.png",
  },
  {
    title: "Family Contributions",
    description: "Gather stories and memories from loved ones",
    icon: "/images/FamilyContributions.png",
  },
  {
    title: "Private or Public Sharing",
    description: "Control who can view and contribute to the memorial",
    icon: "/images/PrivatePublicSharing.png",
  },
];

export function MemorialFeatures() {
  return (
    <section className="w-full bg-linear-to-br bg-[#add8e6] px-6 py-16 md:py-24">
      <div className=" container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-balance text-3xl font-semibold text-slate-900 md:text-4xl">
            More Than an Obituary
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-slate-700 leading-relaxed">
            Create a beautiful online memorial where loved ones can share
            stories, upload photographs, leave condolences, and celebrate a life
            that touched many hearts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-96 overflow-hidden bg-gray-50">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 bg-[#add8e6] text-center">
                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                {/* {feature.description && (
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
