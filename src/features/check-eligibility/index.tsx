"use client";

import { useState } from "react";
import { useWizardForm } from "./hooks/use-wizard-form";
import { WizardStep } from "./components/wizard-step";
import { PersonalDetailsStep } from "./components/personal-details-step";
import { ContactStep } from "./components/contact-step";
import { AddressStep } from "./components/address-step";
import { EmploymentStep } from "./components/employment-step";
import { useEligibility } from "./context/eligibility-context";
import { useRouter } from "next/navigation";

const steps = [
  {
    title: "About you",
    component: PersonalDetailsStep,
    fields: ["title", "firstName", "lastName", "dateOfBirth"] as const,
  },
  {
    title: "About you",
    component: ContactStep,
    fields: ["email", "mobile"] as const,
  },
  {
    title: "Address",
    component: AddressStep,
    fields: ["address", "houseNumber", "postcode"] as const,
  },
  {
    title: "Income",
    component: EmploymentStep,
    fields: ["employmentStatus", "annualIncome"] as const,
  },
];

export const EligibilityCheckerView = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { setUserDetails } = useEligibility();
  const form = useWizardForm();

  const handleNext = async () => {
    const currentStepFields = steps[currentStep].fields;
    const isValid = await form.trigger(currentStepFields);
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const formData = form.getValues();
      console.log("debug formData", formData);
      setUserDetails(formData);

      router.push("/credit-cards");
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <WizardStep
      title={steps[currentStep].title}
      currentStep={currentStep}
      totalSteps={steps.length}
      onBack={handleBack}
      onNext={isLastStep ? handleSubmit : handleNext}
      canProceed={true}
      isLastStep={isLastStep}
    >
      <CurrentStepComponent form={form} />
    </WizardStep>
  );
};
