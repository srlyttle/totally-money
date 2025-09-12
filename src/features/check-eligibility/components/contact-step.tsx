import { UseFormReturn } from "react-hook-form";
import { UserDetails } from "../schemas/user-details";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactStepProps {
  form: UseFormReturn<UserDetails>;
}

export const ContactStep = ({ form }: ContactStepProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-700">
          We need a few details to get you set up and check your eligibility.
          This won&apos;t affect your credit score.
        </p>
      </div>

      <div>
        <Label
          htmlFor="email"
          className="text-base font-semibold text-gray-900"
        >
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1"
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="mobile"
          className="text-base font-semibold text-gray-900"
        >
          What&apos;s your mobile number?
        </Label>
        <p className="text-sm text-gray-600 mt-1 mb-3">
          This is to check your identity. We&apos;ll never call you.
        </p>
        <Input
          id="mobile"
          type="tel"
          {...register("mobile")}
          className="mt-1"
          placeholder="07456541467"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
        )}
      </div>
    </div>
  );
};
