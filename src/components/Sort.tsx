import { ArrowUpDown } from "lucide-react";

interface SortProps {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export function SortAgeAndName({
  sortBy,
  sortOrder,
  onSort,
  options,
}: SortProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>
      <div className="flex gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSort(option.value)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              sortBy === option.value
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span>{option.label}</span>
            <ArrowUpDown className="w-4 h-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
