import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
    </div>
  );
} 