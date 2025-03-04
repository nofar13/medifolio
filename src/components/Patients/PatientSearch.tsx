
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PatientSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const PatientSearch = ({ searchTerm, onSearchChange }: PatientSearchProps) => {
  return (
    <div className="mb-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        <Input
          placeholder="חיפוש לפי שם או מספר זהות..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-3 py-2 w-full"
        />
      </div>
    </div>
  );
};
