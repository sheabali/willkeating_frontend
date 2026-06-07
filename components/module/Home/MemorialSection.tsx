"use client";

import Image from "next/image";
import Link from "next/link";

export default function MemorialPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:py-24 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Decorative background shapes */}
          <div className="absolute top-8 right-0 w-96 h-96 border-2 border-accent/20 rounded-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 border-2 border-accent/20 rounded-full -z-10"></div>

          {/* Centered content */}
          <div className="text-center">
            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MbJVLvJLoPs0SqDl5ziMYmflqK3Ob7.png"
                  alt="Family memorial photo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-balance text-4xl sm:text-5xl font-bold leading-tight mb-2">
              <span className="text-primary">
                Recently Published Death Notices
              </span>
              <br />
              <span className="text-primary">and </span>
              <span className="text-accent">Memorial Announcements</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg text-primary/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Browse recently published death notices and funeral arrangements
              shared by families.
            </p>

            {/* CTA Link */}
            <Link
              href="#"
              className="inline-block text-accent font-semibold text-lg hover:underline underline-offset-4 transition-all"
            >
              View All Notices
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              How It Works
            </h2>
            <p className="text-lg text-primary/70 max-w-2xl mx-auto leading-relaxed">
              Publish important funeral information quickly, then create a
              lasting space where family and friends can come together to share
              memories, support, and tributes.
            </p>
          </div>

          {/* Three Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Publish a Notice */}
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h4" />
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                  <path d="M9 7h6" />
                  <path d="M9 11h6" />
                  <path d="M9 15h2" />
                  <path d="M16 9l2 2-2 2" />
                </svg>
              </div>
              {/* Title */}
              <h3 className="text-2xl font-bold text-primary mb-4">
                Publish a Notice
              </h3>
              {/* Description */}
              <p className="text-primary/70 leading-relaxed">
                Share important information about your loved one and upcoming
                funeral arrangements.
              </p>
            </div>

            {/* Column 2: Create a Memorial */}
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M12 6v6l4 2.5" />
                  <circle cx="12" cy="12" r="8" />
                  <path d="M7.5 9.5c0 1.933 1.567 3.5 3.5 3.5s3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5-3.5 1.567-3.5 3.5z" />
                </svg>
              </div>
              {/* Title */}
              <h3 className="text-2xl font-bold text-primary mb-4">
                Create a Memorial
              </h3>
              {/* Description */}
              <p className="text-primary/70 leading-relaxed">
                Build a dedicated space where memories, photos, and stories can
                be preserved.
              </p>
            </div>

            {/* Column 3: Bring Family Together */}
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-accent"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              {/* Title */}
              <h3 className="text-2xl font-bold text-primary mb-4">
                Bring Family Together
              </h3>
              {/* Description */}
              <p className="text-primary/70 leading-relaxed">
                Invite relatives and friends to share tributes, condolences, and
                cherished memories.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
