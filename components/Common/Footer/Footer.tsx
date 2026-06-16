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

const wrapperClasses = "mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-[#add8e6]">
      {/* Main Footer Content */}
      <div className={`${wrapperClasses} py-16`}>
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          {/* Logo Section */}
          <div className="flex w-full justify-center md:w-auto md:justify-start">
            <Link
              href="/"
              className="group relative h-20 w-20 shrink-0 transition-transform hover:scale-105 sm:h-24 sm:w-24"
            >
              <Image
                src="/images/Logo.png"
                alt="Remembered Forever Logo"
                fill
                sizes="96px"
                className="object-contain"
              />
            </Link>
          </div>

          {/* Links Sections */}
          <nav
            aria-label="Footer"
            className="flex w-full flex-col gap-8 text-center sm:flex-row sm:justify-between sm:gap-12 sm:text-left md:w-auto md:gap-16"
          >
            {footerSections.map((section) => (
              <div
                key={section.title}
                className="flex flex-col items-center gap-4 sm:items-start"
              >
                <h3 className="text-sm font-semibold text-slate-800">
                  {section.title}
                </h3>
                <ul className="flex flex-col items-center gap-3 sm:items-start">
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
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Divider */}
      <div className={wrapperClasses}>
        <div className="border-t border-slate-300" />
      </div>

      {/* Copyright Section */}
      <div className={`${wrapperClasses} py-8`}>
        <p className="text-center text-sm text-slate-600">
          © {currentYear} Remembered Forever. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
