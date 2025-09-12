export interface CreditCard {
  id: string;
  name: string;
  provider: string;
  description: string;
  apr: number;
  creditLimit: number;
  balanceTransferOffer: {
    rate: number;
    duration: number; // months
    fee: number; // percentage
  };
  purchaseOffer: {
    rate: number;
    duration: number; // months
  };
  image: string;
  features: string[];
  eligibilityRules: EligibilityRule[];
  // Derived UI fields (for ResultCard rendering)
  details?: Array<{
    detail: string;
    title: string;
  }>;
  representativeExample?: {
    title: string;
    description: string;
  };
  isEligible?: boolean;

  // Additional properties for detailed view
  whatsGood?: string[];
  whatsBad?: string[];
  additionalFeatures?: string[];
  eligibility?: string[];
  ratesAndFees?: {
    balanceTransferOffer: {
      introRate: string;
      duration: string;
      transferFee: string;
    };
    purchaseOffer: {
      introRate: string;
      duration: string;
    };
    annualRates: {
      balanceTransfers: string;
      purchases: string;
      cashWithdrawals: string;
    };
    otherFees: {
      annualFee: string;
      overseasTransactionFee: string;
    };
  };
}

export interface EligibilityRule {
  id: string;
  field: keyof UserEligibilityData;
  operator:
    | "equals"
    | "greater_than"
    | "less_than"
    | "contains"
    | "in"
    | "not_in";
  value: string | number | string[] | number[];
  message: string;
}

export interface UserEligibilityData {
  age: number;
  employmentStatus: string;
  annualIncome: number;
  addressHistory: number; // years
  creditScore?: number;
  existingDebt?: number;
  monthlyRent?: number;
}

export interface EligibilityResult {
  card: CreditCard;
  isEligible: boolean;
  reasons: string[];
  confidence: number; // 0-100
}
