"use client";

interface Obituary {
  deceasedName: string;
  submittedBy: string;
  status: "PUBLISHED" | "DRAFT" | "PENDING";
  date: string;
}

interface RecentObituariesProps {
  obituaries?: Obituary[];
  onViewAll?: () => void;
}

const defaultObituaries: Obituary[] = [
  {
    deceasedName: "Eugene Rigby",
    submittedBy: "John Lennon",
    status: "PUBLISHED",
    date: "Oct 24, 2023",
  },
  {
    deceasedName: "Arthur Miller",
    submittedBy: "Marilyn M.",
    status: "PUBLISHED",
    date: "Oct 23, 2023",
  },
  {
    deceasedName: "Samuel Beckett",
    submittedBy: "Wailing G.",
    status: "PUBLISHED",
    date: "Oct 22, 2023",
  },
  {
    deceasedName: "Virginia d Golf",
    submittedBy: "Leonard W.",
    status: "PUBLISHED",
    date: "Oct 21, 2023",
  },
  {
    deceasedName: "Virginia d Golf",
    submittedBy: "Leonard W.",
    status: "PUBLISHED",
    date: "Oct 21, 2023",
  },
  {
    deceasedName: "Virginia d Golf",
    submittedBy: "Leonard W.",
    status: "PUBLISHED",
    date: "Oct 21, 2023",
  },
];

const statusStyles = {
  PUBLISHED: "bg-green-100 text-green-800",
  DRAFT: "bg-gray-100 text-gray-800",
  PENDING: "bg-yellow-100 text-yellow-800",
};

export function RecentObituaries({
  obituaries = defaultObituaries,
  onViewAll,
}: RecentObituariesProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Obituaries
        </h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Deceased Name
              </th>
              <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Submitted By
              </th>
              <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Status
              </th>
              <th className="pb-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {obituaries.map((obituary, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 text-sm font-medium text-gray-900">
                  {obituary.deceasedName}
                </td>
                <td className="py-3 text-sm text-gray-600">
                  {obituary.submittedBy}
                </td>
                <td className="py-3">
                  <span
                    className={`inline-block rounded px-3 py-1 text-xs font-semibold uppercase ${statusStyles[obituary.status]}`}
                  >
                    {obituary.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600">{obituary.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
