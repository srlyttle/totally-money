import { Button } from "@/components/ui/button";

export const FilterPills = () => {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      <div className="flex gap-2 min-w-max">
        <Button variant="outline">All Cards</Button>
        <Button variant="outline">Balance Transfer</Button>
        <Button variant="outline">0% Purchases</Button>
        <Button variant="outline">Cashback</Button>
        <Button variant="outline">Rewards</Button>
        <Button variant="outline">Balance & Purchases</Button>
        <Button variant="outline">Travel</Button>
        <Button variant="outline">Poor Credit</Button>
      </div>
    </div>
  );
};
