import { useQuery } from "@tanstack/react-query";
import { CreditCard } from "../../../types/credit-card";

interface CreditCardsResponse {
  success: boolean;
  data: CreditCard[];
  error?: string;
}

async function fetchCreditCards(): Promise<CreditCard[]> {
  const response = await fetch("/api/credit-cards", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch credit cards");
  }

  const result: CreditCardsResponse = await response.json();

  if (!result.success) {
    throw new Error(result.error || "Failed to fetch credit cards");
  }

  return result.data;
}

export function useCreditCards() {
  return useQuery({
    queryKey: ["credit-cards"],
    queryFn: fetchCreditCards,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
