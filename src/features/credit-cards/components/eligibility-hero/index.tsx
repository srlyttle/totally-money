import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";

interface EligibilityHeroProps {
  buttonText?: string;
  features?: string[];
  onButtonClick?: () => void;
}

export const EligibilityHero = ({
  buttonText = "Check my eligibility",
  features = [
    "Get your free credit report",
    "No harm to your credit rating",
    "See your best offers",
    "Free forever",
  ],
  onButtonClick,
}: EligibilityHeroProps) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-950 to-blue-900 p-8 rounded-sm">
      <div className="flex items-center justify-between">
        <div className="w-full md:w-1/2 flex flex-col gap-6 px-2">
          <h1 className="hidden md:block text-white text-6xl font-bold">
            Find the right credit card for you
          </h1>

          <Button
            onClick={onButtonClick}
            className="w-full md:w-96 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-4 text-lg rounded-full"
          >
            {buttonText}
          </Button>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-sm font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block flex-1p justify-center">
          <Image
            className="max-w-none"
            src="/creditcards-hero.png"
            alt="Credit Card"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};
