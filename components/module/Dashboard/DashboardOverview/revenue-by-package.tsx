"use client";

interface RevenueByPackageProps {
  packages?: Array<{
    name: string;
    revenue: string;
  }>;
}

const defaultPackages = [
  { name: "Premium Package", revenue: "$8,840" },
  { name: "Basic Package", revenue: "$3,290" },
];

export function RevenueByPackage({
  packages = defaultPackages,
}: RevenueByPackageProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Subscription Overview
      </h2>
      <div className="space-y-4">
        {packages.map((pkg, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-16 rounded-full ${
                  index === 0 ? "bg-blue-600" : "bg-amber-500"
                }`}
              />
              <span className="text-sm font-medium text-gray-700">
                {pkg.name}
              </span>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {pkg.revenue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
