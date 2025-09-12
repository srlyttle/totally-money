import { useEligibilityCheck } from "@/features/check-eligibility/hooks/use-eligibility-check";
import { useCreditCards } from "./use-credit-cards";
import { useEligibility } from "@/features/check-eligibility/context/eligibility-context";

export const useCardData = () => {
  const {
    state: { userDetails },
  } = useEligibility();
  const {
    data: cards = [],
    isLoading: cardsLoading,
    error: cardsError,
  } = useCreditCards();

  const {
    data: eligibilityData,
    isLoading: eligibilityLoading,
    error: eligibilityError,
  } = useEligibilityCheck(userDetails);

  const eligibleCards = eligibilityData?.eligibleCards || [];

  const isLoading = cardsLoading || eligibilityLoading;
  const error = cardsError || eligibilityError;

  const hasEligibleCards = eligibleCards.length > 0;

  const cardsToDisplay = hasEligibleCards
    ? eligibleCards.map((card) => card.card)
    : cards;

  return {
    cards,
    eligibilityData,
    eligibleCards,
    isLoading,
    error,
    hasEligibleCards,
    cardsToDisplay,
  };
};
