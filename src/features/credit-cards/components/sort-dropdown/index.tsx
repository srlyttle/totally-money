import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsUpDown } from "lucide-react";

export const SortDropdown = () => {
  return (
    <div className="flex justify-end items-center mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <Select defaultValue="balance-transfer">
          <SelectTrigger className="w-48 sm:w-64">
            <SelectValue />
            <ChevronsUpDown className="h-4 w-4 ml-2" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="balance-transfer">
              Introductory Balance Transfer Offer
            </SelectItem>
            <SelectItem value="apr">Representative APR</SelectItem>
            <SelectItem value="credit-limit">Credit Limit</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
