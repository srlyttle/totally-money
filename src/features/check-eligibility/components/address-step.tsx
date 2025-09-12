import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { UserDetails } from "../schemas/user-details";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface AddressStepProps {
  form: UseFormReturn<UserDetails>;
}

const mockAddresses = [
  "3 Station Halt, Portstewart BT55 7UN",
  "3 Station Halt, Swindon SN3 4GL",
  "26 Grovefield Street, Belfast BT6 8BA",
  "123 Main Street, London SW1A 1AA",
  "45 High Street, Manchester M1 1AA",
];

export const AddressStep = ({ form }: AddressStepProps) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = form;
  const [addressQuery, setAddressQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (addressQuery.length > 2) {
      const filtered = mockAddresses.filter((addr) =>
        addr.toLowerCase().includes(addressQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [addressQuery]);

  const handleAddressSelect = (address: string) => {
    setValue("address", address);
    setAddressQuery(address);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold text-gray-900 mb-3 block">
          What&apos;s your current address?
        </Label>
        <p className="text-sm text-gray-600 mb-4">
          We need this to check your identity.
        </p>

        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={addressQuery}
              onChange={(e) => setAddressQuery(e.target.value)}
              className="pl-10"
              placeholder="Search for address"
            />
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {suggestions.map((address, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleAddressSelect(address)}
                >
                  {address}
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-sm text-purple-600 mt-2">
          <button
            type="button"
            className="underline"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            Enter address manually
          </button>
        </p>

        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="houseNumber"
            className="text-base font-semibold text-gray-900"
          >
            House number
          </Label>
          <Input
            id="houseNumber"
            {...register("houseNumber")}
            className="mt-1"
            placeholder="3"
          />
          {errors.houseNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.houseNumber.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="postcode"
            className="text-base font-semibold text-gray-900"
          >
            Postcode
          </Label>
          <Input
            id="postcode"
            {...register("postcode")}
            className="mt-1"
            placeholder="BT55 7UN"
          />
          {errors.postcode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.postcode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
