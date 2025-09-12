import { useQuery } from "@tanstack/react-query";
import { UserDetails } from "../schemas/user-details";
import { EligibilityResult } from "../../../types/credit-card";

interface EligibilityCheckResponse {
  success: boolean;
  data: {
    userDetails: UserDetails;
    eligibleCards: EligibilityResult[];
    summary: {
      totalEligibleCards: number;
      totalCreditLimit: number;
      averageAPR: number;
    };
  };
  error?: string;
}

function userDetailsToQueryString(userDetails: UserDetails): string {
  const params = new URLSearchParams();

  const dob = `${
    userDetails.dateOfBirth.year
  }-${userDetails.dateOfBirth.month.padStart(
    2,
    "0"
  )}-${userDetails.dateOfBirth.day.padStart(2, "0")}`;

  params.set("title", userDetails.title);
  params.set("firstName", userDetails.firstName);
  params.set("lastName", userDetails.lastName);
  params.set("dob", dob);
  params.set("email", userDetails.email);
  params.set("mobile", userDetails.mobile);
  params.set("address", userDetails.address);
  params.set("houseNumber", userDetails.houseNumber);
  params.set("postcode", userDetails.postcode);
  params.set("employmentStatus", userDetails.employmentStatus);
  params.set("annualIncome", userDetails.annualIncome.toString());

  return params.toString();
}

async function checkEligibility(
  userDetails: UserDetails
): Promise<EligibilityCheckResponse["data"]> {
  const queryString = userDetailsToQueryString(userDetails);

  const response = await fetch(`/api/eligibility/check?${queryString}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to check eligibility");
  }

  const result: EligibilityCheckResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to check eligibility");
  }

  return result.data;
}

export function useEligibilityCheck(userDetails: UserDetails | null) {
  return useQuery({
    queryKey: ["eligibility-check", userDetails],
    queryFn: () => checkEligibility(userDetails!),
    enabled: !!userDetails, // Only run query when userDetails exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
