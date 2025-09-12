import { UseFormReturn } from "react-hook-form";
import { UserDetails } from "../schemas/user-details";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmploymentStepProps {
  form: UseFormReturn<UserDetails>;
}

const employmentOptions = [
  "Full time",
  "Part time",
  "Self employed",
  "Student",
  "Unemployed",
  "Retired",
];

export const EmploymentStep = ({ form }: EmploymentStepProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-700">
          This will help give you more accurate credit card offers.
        </p>
      </div>

      <div>
        <Label className="text-base font-semibold text-gray-900 mb-3 block">
          What&apos;s your employment status?
        </Label>
        <div className="space-y-2">
          {employmentOptions.map((option) => (
            <label
              key={option}
              className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                form.watch("employmentStatus") === option
                  ? "bg-purple-100 border-purple-500"
                  : "bg-white border-gray-300 hover:border-purple-300"
              }`}
            >
              <input
                type="radio"
                value={option}
                {...register("employmentStatus")}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 mr-3 ${
                  form.watch("employmentStatus") === option
                    ? "border-purple-500 bg-purple-500"
                    : "border-gray-300"
                }`}
              >
                {form.watch("employmentStatus") === option && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
        {errors.employmentStatus && (
          <p className="text-red-500 text-sm mt-1">
            {errors.employmentStatus.message}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="annualIncome"
          className="text-base font-semibold text-gray-900"
        >
          What is your annual income before tax?
        </Label>
        <p className="text-sm text-gray-600 mt-1 mb-3">
          This includes salary, benefits, and pensions.
        </p>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            £
          </span>
          <Input
            id="annualIncome"
            type="number"
            {...register("annualIncome", { valueAsNumber: true })}
            className="pl-8 pr-20"
            placeholder="90000"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            per year
          </span>
        </div>
        {errors.annualIncome && (
          <p className="text-red-500 text-sm mt-1">
            {errors.annualIncome.message}
          </p>
        )}
      </div>
    </div>
  );
};
