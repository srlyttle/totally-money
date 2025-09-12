import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { CardInfo } from "../card-info";
import { FooterMessage } from "../footer-message";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
interface CardDetail {
  title: string;
  detail: string;
  showHelpIcon?: boolean;
}

interface SpecialOffer {
  text: string;
}

interface RepresentativeExample {
  title: string;
  description: string;
}
interface Props {
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  details: CardDetail[];
  specialOffers?: SpecialOffer[];
  representativeExample?: RepresentativeExample;
  isEligible: boolean;
  onCardSelect?: () => void;
  isSelected: boolean;
  isDetailView?: boolean;
}

export const ResultCard: React.FC<Props> = ({
  isEligible,
  title,
  imageSrc,
  imageAlt,
  details,

  representativeExample,

  onCardSelect,
  isSelected,
  isDetailView = false,
}) => {
  const router = useRouter();

  const handleMoreDetailsClick = () => {
    router.push(`/credit-cards/${title}`);
  };
  const handleNavigateToEligibilityChecker = () => {
    router.push("/check-eligibility");
  };

  return (
    <Card
      data-testid="credit-card"
      style={{
        borderColor: isSelected ? "green" : undefined,
      }}
      className={`mb-2 md:mb-4 cursor-pointer`}
      onClick={isEligible ? onCardSelect : undefined}
    >
      <CardContent className="p-4">
        <div className="block sm:hidden">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>

          <div className="flex justify-center mb-4">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                width={100}
                height={60}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {details.slice(0, 2).map((detail, index) => (
              <CardInfo
                key={`${detail.title}-${index}`}
                title={detail.title}
                detail={detail.detail}
                showHelpIcon={detail.showHelpIcon}
              />
            ))}
          </div>

          {details.length > 2 && (
            <div className="space-y-2 mb-4 text-sm">
              {details.slice(2).map((detail, index) => (
                <div
                  key={`${detail.title}-${index + 2}`}
                  className="flex justify-between"
                >
                  <span className="text-gray-600">{detail.detail}</span>
                  <span className="font-semibold">{detail.title}</span>
                </div>
              ))}
            </div>
          )}

          {!isDetailView ? (
            <div className="w-full">
              <Button
                className="w-full"
                onClick={handleNavigateToEligibilityChecker}
              >
                Check my eligibility
              </Button>

              <Button
                variant="secondary"
                onClick={handleMoreDetailsClick}
                className="mt-3 w-full"
              >
                More details
              </Button>
            </div>
          ) : (
            <div className="w-full">
              <Button className="w-full">Apply now</Button>
            </div>
          )}
        </div>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2">
            <h3
              className="text-lg font-semibold text-gray-900 pb-2"
              data-testid={`credit-card-title-${title}`}
            >
              {title}
            </h3>
            {isEligible && (
              <div className="flex items-center   text-green-800 pb-1.5">
                <BadgeCheck className="w-5 h-5 pr-[2px]" />
                <span className="text-sm font-medium">Pre-Approved</span>
              </div>
            )}
          </div>
          <div className="flex items-start gap-4 mb-4 justify-between">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                width={145}
                height={95}
                className="flex-shrink-0"
              />
            )}

            {!isDetailView ? (
              <div className="flex flex-col xs:flex-row gap-3 sm:justify-end">
                <Button
                  onClick={
                    isEligible ? undefined : handleNavigateToEligibilityChecker
                  }
                  className="sm:w-auto"
                >
                  {isEligible ? "Apply now" : "Check my eligibility"}
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleMoreDetailsClick}
                  className="sm:w-auto"
                >
                  More details
                </Button>
              </div>
            ) : (
              <div className="flex flex-col xs:flex-row gap-3 sm:justify-end">
                <Button className="sm:w-auto">Apply now</Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4">
            {details.map((detail, index) => (
              <CardInfo
                key={`${detail.title}-${index}`}
                title={detail.title}
                detail={detail.detail}
                showHelpIcon={detail.showHelpIcon}
                isEligible={isEligible}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-200/30">
        {representativeExample && (
          <FooterMessage
            title={representativeExample?.title}
            description={representativeExample?.description}
            showIcon
          />
        )}
      </CardFooter>
    </Card>
  );
};
