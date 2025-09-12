import { Button } from "@/components/ui/button";
import { CreditCard } from "@/types/credit-card";
import { EligibilityHero } from "../eligibility-hero";
import { ResultCard } from "../result-card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";
import { CreditCard as CreditCardIcon } from "lucide-react";

interface Props {
  hasEligibleCards: boolean;
  cards: CreditCard[];
}

export const CardList = ({ hasEligibleCards, cards }: Props) => {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const combinedCreditLimit = selectedCards.reduce((acc, card) => {
    const cardData = cards.find((c) => c.name === card);
    return acc + (cardData?.creditLimit || 0);
  }, 0);

  const handleCardSelect = (card: CreditCard) => {
    if (selectedCards.includes(card.name)) {
      setSelectedCards((prev) => prev.filter((c) => c !== card.name));
    } else {
      setSelectedCards((prev) => [...prev, card.name]);
    }
    // router.push(`/credit-cards/${card.id}`);
  };

  const handleNavigateToEligibilityChecker = () => {
    router.push("/check-eligibility");
  };

  return (
    <>
      {!hasEligibleCards ? (
        <div className="flex flex-col gap-4 pb-2">
          <EligibilityHero onButtonClick={handleNavigateToEligibilityChecker} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex justify-end">
            <Button variant="link" onClick={handleNavigateToEligibilityChecker}>
              Edit my details
            </Button>
          </div>

          <Alert className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" color="green" />
            <AlertTitle>
              You have {cards.length} pre-approved credit cards
            </AlertTitle>
          </Alert>
        </div>
      )}

      {selectedCards.length > 1 && (
        <Alert className="flex items-center gap-2 mb-2">
          <CreditCardIcon className="w-4 h-4" color="green" />
          <AlertTitle className="font-semibold">
            Your total amount of credit selected is
            <span className="font-bold"> £ {combinedCreditLimit}</span>
          </AlertTitle>
        </Alert>
      )}
      {cards.map((card) => (
        <ResultCard
          isEligible={hasEligibleCards}
          key={card.id}
          title={card.name}
          details={card.details ?? []}
          representativeExample={card.representativeExample}
          imageSrc={card.image}
          imageAlt={card.name}
          onCardSelect={() => handleCardSelect(card)}
          isSelected={selectedCards.includes(card.name)}
        />
      ))}
    </>
  );
};
