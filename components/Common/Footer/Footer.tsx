"use client";

import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Notices",
    links: [
      { label: "Obituary Notices", href: "/notices/obituaries" },
      { label: "Funeral Notices", href: "/notices/funerals" },
    ],
  },
  {
    title: "Memorials",
    links: [
      { label: "Shared Memories", href: "/memorials/shared" },
      { label: "Add New Memory", href: "/memorials/new" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms & Conditions", href: "/legal/terms" },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#add8e6]">
      {/* Main Footer Content */}
      <div className="mx-auto container px-6 py-16 sm:px-8 lg:px-12">
        <div className="flex gap-12 md:flex-row md:justify-between">
          {/* Logo Section */}
          <div className="flex shrink-0 justify-center md:justify-start">
            <Link
              href="/"
              className="group relative h-24 w-24 transition-transform hover:scale-105"
            >
              <Image
                src="/logo.png"
                alt="Remembered Forever Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Links Sections */}
          <div className="flex flex-1 flex-col gap-8 sm:flex-row sm:gap-12 md:gap-16">
            {footerSections.map((section) => (
              <nav key={section.title} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-slate-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl border-t border-slate-300" />

      {/* Copyright Section */}
      <div className="bg-[#add8e6] px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm text-slate-600">
            © {currentYear} Remembered Forever. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
