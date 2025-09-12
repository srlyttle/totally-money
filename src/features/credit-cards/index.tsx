"use client";
import React from "react";
import { CardsLoadingSkeleton } from "./components/cards-loading-skeleton";
import { CardList } from "./components/card-list";
import { useCardData } from "./hooks/use-card-data";

const CreditCards = () => {
  const { isLoading, error, hasEligibleCards, cardsToDisplay } = useCardData();

  if (isLoading) {
    return <CardsLoadingSkeleton />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <CardList hasEligibleCards={hasEligibleCards} cards={cardsToDisplay} />
  );
};

export default CreditCards;
