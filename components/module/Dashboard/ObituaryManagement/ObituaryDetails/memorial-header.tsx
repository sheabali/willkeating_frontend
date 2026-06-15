import Link from "next/link";

interface MemorialHeaderProps {
  name: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
}

export function MemorialHeader({ name, breadcrumb }: MemorialHeaderProps) {
  return (
    <div className="bg-neutral-50 border-b border-neutral-200 py-8 px-4">
      <div className="container mx-auto">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav
            className="text-sm text-neutral-600 mb-4"
            aria-label="Breadcrumb"
          >
            {breadcrumb.map((item, index) => (
              <span key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-neutral-900 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <span className="mx-2">&rsaquo;</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-4xl text-neutral-900">{name}</h1>
      </div>
    </div>
  );
}
