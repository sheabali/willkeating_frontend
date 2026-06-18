import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: PaginationProps) {
  const pages = useMemo(() => {
    const window = 1;
    const result: (number | "ellipsis")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      const isEdge = i === 1 || i === totalPages;
      const isNearCurrent = Math.abs(i - currentPage) <= window;

      if (isEdge || isNearCurrent) {
        result.push(i);
      } else if (result[result.length - 1] !== "ellipsis") {
        result.push("ellipsis");
      }
    }

    return result;
  }, [currentPage, totalPages]);

  return (
    <div className="mt-12 flex items-center justify-center gap-2 pb-8">
      {pages.map((p, idx) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${idx}`} className="mx-2 text-gray-600">
            ...
          </span>
        ) : (
          <button
            key={p}
            disabled={disabled}
            onClick={() => onPageChange(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors disabled:opacity-50 ${
              p === currentPage
                ? "bg-primary text-white hover:bg-amber-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {p}
          </button>
        ),
      )}
    </div>
  );
}
