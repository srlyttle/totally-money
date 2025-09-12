"use client";
import { useParams } from "next/navigation";
import { ResultCard } from "../credit-cards/components/result-card";
import { useCardData } from "../credit-cards/hooks/use-card-data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { CardDetailedInfo } from "./components/card-detailed-info";
export const CardDetail = () => {
  const router = useRouter();
  const { id } = useParams();
  const decodedId = decodeURIComponent(id as string);
  const { cards, eligibleCards } = useCardData();
  //Card not found Student%20Life%20Card
  console.log("debug decoxdedId in CardDetail", decodedId);
  const card = cards.find((card) => card.name === decodedId);
  const isCardEligible = eligibleCards.some((card) => card.card.id === id);
  if (!card) {
    return <div>Card not found {id}</div>;
  }

  return (
    <div>
      <div className="flex items-center">
        <ArrowLeftIcon className="w-4 h-4" />
        <Button
          variant="link"
          className="text-md"
          onClick={() => router.back()}
        >
          Back to Cards
        </Button>
      </div>
      <ResultCard
        isEligible={isCardEligible}
        key={card?.id}
        title={card.name}
        details={card.details ?? []}
        representativeExample={card.representativeExample}
        imageSrc={card.image}
        imageAlt={card.name}
        isSelected={false}
        isDetailView={true}
      />
      <CardDetailedInfo card={card} />
    </div>
  );
};
