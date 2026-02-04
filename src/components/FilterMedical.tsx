import { Filter, X } from "lucide-react";

interface FilterProps {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  onClearAll: () => void;
  label?: string;
}

export function FilterMedical({
  options,
  selected,
  onToggle,
  onClearAll,
  label = "Filter by:",
}: FilterProps) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        {selected.length > 0 && (
          <button
            onClick={onClearAll}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors ${
              selected.includes(option)
                ? "bg-blue-50 text-blue-600 border-blue-200"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
} 