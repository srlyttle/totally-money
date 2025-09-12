import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WizardStepProps {
  title: string;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  isLastStep: boolean;
  children: React.ReactNode;
}

export const WizardStep = ({
  title,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  canProceed,
  isLastStep,
  children,
}: WizardStepProps) => {
  return (
    <div className="min-h-screen  p-4 rounded-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-2">{title}</h1>

        <div className="flex gap-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded ${
                i < currentStep
                  ? "bg-primary"
                  : i === currentStep
                  ? "bg-secondary"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          {children}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={onBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button variant="default" onClick={onNext} disabled={!canProceed}>
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
