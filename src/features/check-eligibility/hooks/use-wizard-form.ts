import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDetailsSchema, UserDetails } from "../schemas/user-details";
import { useEligibility } from "../context/eligibility-context";

export const useWizardForm = () => {
  const { state } = useEligibility();
  const { userDetails } = state;

  const form = useForm<UserDetails>({
    resolver: zodResolver(userDetailsSchema),
    mode: "onChange",
    defaultValues: {
      title: (userDetails?.title as "Mr" | "Mrs" | "Miss" | "Ms" | "Dr") || "",
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      dateOfBirth: {
        day: userDetails?.dateOfBirth?.day || "",
        month: userDetails?.dateOfBirth?.month || "",
        year: userDetails?.dateOfBirth?.year || "",
      },
      email: userDetails?.email || "",
      mobile: userDetails?.mobile || "",
      address: userDetails?.address || "",
      houseNumber: userDetails?.houseNumber || "",
      postcode: userDetails?.postcode || "",
      employmentStatus:
        (userDetails?.employmentStatus as
          | "Full time"
          | "Part time"
          | "Self employed"
          | "Student"
          | "Unemployed"
          | "Retired") || "",
      annualIncome: userDetails?.annualIncome || 0,
    },
  });

  return form;
};
