import { CreditCard } from "../../../types/credit-card";

// Mock credit cards data
export const mockCreditCards: CreditCard[] = [
  {
    id: "student-life-card",
    name: "Student Life Card",
    provider: "Student Bank",
    description: "Perfect for students building their credit history",
    apr: 18.9,
    creditLimit: 1200,
    balanceTransferOffer: {
      rate: 0,
      duration: 0,
      fee: 0,
    },
    purchaseOffer: {
      rate: 0,
      duration: 0,
    },
    image:
      "https://d2bltdgfhxagqj.cloudfront.net/_next/image/?url=https%3A%2F%2Fddialhyn49dxu.cloudfront.net%2Fcards%2Fhsbc2021new-large.png&w=256&q=75",
    features: [
      "No annual fee",
      "Credit building tools",
      "Mobile app",
      "24/7 support",
    ],
    details: [
      { detail: "Representative % APR (variable)", title: "18.9%" },
      { detail: "Credit limit", title: "£1,200" },
      { detail: "Balance transfer offer duration", title: "No offer" },
      { detail: "0% Purchase offer duration", title: "No offer" },
      { detail: "Balance transfer fee", title: "0%" },
    ],
    representativeExample: {
      title: "Representative Example",
      description:
        "If you spend £1,200 at a purchase interest rate of 18.9% p.a. (variable) your representative APR will be 18.9% APR (variable)",
    },
    eligibilityRules: [
      {
        id: "student-only",
        field: "employmentStatus",
        operator: "equals",
        value: "Student",
        message: "Must be a student",
      },
      {
        id: "age-18-plus",
        field: "age",
        operator: "greater_than",
        value: 17,
        message: "Must be 18 or older",
      },
    ],
    // Additional inferred properties
    whatsGood: [
      "Up to 56 days interest-free credit on purchases",
      "Credit building tools and guidance",
      "No annual fee",
      "24/7 student support",
    ],
    whatsBad: [
      "Limited credit limit",
      "No balance transfer offers",
      "Higher APR for non-students",
    ],
    additionalFeatures: [
      "Mobile banking app",
      "Credit score monitoring",
      "Spending insights",
      "Contactless payments",
    ],
    eligibility: [
      "Must be 18 or older",
      "Must be a current student",
      "UK resident for 3+ years",
      "No recent bankruptcy or CCJs",
    ],
    ratesAndFees: {
      balanceTransferOffer: {
        introRate: "0%",
        duration: "No offer",
        transferFee: "0%",
      },
      purchaseOffer: {
        introRate: "0%",
        duration: "No offer",
      },
      annualRates: {
        balanceTransfers: "18.9%",
        purchases: "18.9%",
        cashWithdrawals: "22.9%",
      },
      otherFees: {
        annualFee: "£0",
        overseasTransactionFee: "2.95%",
      },
    },
  },
  {
    id: "anywhere-card",
    name: "Anywhere Card",
    provider: "Universal Bank",
    description: "Available to everyone with basic eligibility",
    apr: 33.9,
    creditLimit: 300,
    balanceTransferOffer: {
      rate: 0,
      duration: 0,
      fee: 0,
    },
    purchaseOffer: {
      rate: 0,
      duration: 0,
    },
    image:
      "https://d2bltdgfhxagqj.cloudfront.net/_next/image/?url=https%3A%2F%2Fddialhyn49dxu.cloudfront.net%2Fcards%2Fms2024-large.png&w=384&q=75",
    features: ["No annual fee", "Basic credit building", "Online banking"],
    details: [
      { detail: "Representative % APR (variable)", title: "33.9%" },
      { detail: "Credit limit", title: "£300" },
      { detail: "Balance transfer offer duration", title: "No offer" },
      { detail: "0% Purchase offer duration", title: "No offer" },
      { detail: "Balance transfer fee", title: "0%" },
    ],
    representativeExample: {
      title: "Representative Example",
      description:
        "If you spend £1,200 at a purchase interest rate of 33.9% p.a. (variable) your representative APR will be 33.9% APR (variable)",
    },
    eligibilityRules: [
      {
        id: "age-18-plus",
        field: "age",
        operator: "greater_than",
        value: 17,
        message: "Must be 18 or older",
      },
    ],
    // Additional inferred properties
    whatsGood: [
      "No annual fee",
      "Basic credit building",
      "Easy approval process",
      "Online banking access",
    ],
    whatsBad: [
      "Very low credit limit",
      "High APR",
      "No rewards or benefits",
      "No balance transfer offers",
    ],
    additionalFeatures: [
      "Online banking",
      "Basic mobile app",
      "Contactless payments",
    ],
    eligibility: [
      "Must be 18 or older",
      "UK resident",
      "Basic income verification",
    ],
    ratesAndFees: {
      balanceTransferOffer: {
        introRate: "0%",
        duration: "No offer",
        transferFee: "0%",
      },
      purchaseOffer: {
        introRate: "0%",
        duration: "No offer",
      },
      annualRates: {
        balanceTransfers: "33.9%",
        purchases: "33.9%",
        cashWithdrawals: "35.9%",
      },
      otherFees: {
        annualFee: "£0",
        overseasTransactionFee: "2.95%",
      },
    },
  },
  {
    id: "liquid-card",
    name: "Liquid Card",
    provider: "Premium Bank",
    description: "For those with higher income and good credit",
    apr: 33.9,
    creditLimit: 3000,
    balanceTransferOffer: {
      rate: 0,
      duration: 0,
      fee: 0,
    },
    purchaseOffer: {
      rate: 0,
      duration: 0,
    },
    image:
      "https://d2bltdgfhxagqj.cloudfront.net/_next/image/?url=https%3A%2F%2Fddialhyn49dxu.cloudfront.net%2Fcards%2Ftesco-2024-large-large.png&w=384&q=75",
    features: [
      "Higher credit limit",
      "Cashback rewards",
      "Travel insurance",
      "Priority support",
    ],
    details: [
      { detail: "Representative % APR (variable)", title: "33.9%" },
      { detail: "Credit limit", title: "£3,000" },
      {
        detail: "Balance transfer offer duration",
        title: "No offer",
      },
      { detail: "0% Purchase offer duration", title: "No offer" },
      { detail: "Balance transfer fee", title: "0%" },
    ],
    representativeExample: {
      title: "Representative Example",
      description:
        "If you spend £1,200 at a purchase interest rate of 33.9% p.a. (variable) your representative APR will be 33.9% APR (variable)",
    },
    eligibilityRules: [
      {
        id: "age-18-plus",
        field: "age",
        operator: "greater_than",
        value: 17,
        message: "Must be 18 or older",
      },
      {
        id: "income-16k-plus",
        field: "annualIncome",
        operator: "greater_than",
        value: 16000,
        message: "Annual income must be over £16,000",
      },
    ],
    // Additional inferred properties
    whatsGood: [
      "Higher credit limit",
      "Cashback rewards on purchases",
      "Travel insurance included",
      "Priority customer support",
    ],
    whatsBad: ["High APR", "No balance transfer offers", "Income requirements"],
    additionalFeatures: [
      "Cashback rewards program",
      "Travel insurance",
      "Priority support",
      "Mobile banking app",
      "Spending analytics",
    ],
    eligibility: [
      "Must be 18 or older",
      "Annual income over £16,000",
      "UK resident for 3+ years",
      "Good credit history",
    ],
    ratesAndFees: {
      balanceTransferOffer: {
        introRate: "0%",
        duration: "No offer",
        transferFee: "0%",
      },
      purchaseOffer: {
        introRate: "0%",
        duration: "No offer",
      },
      annualRates: {
        balanceTransfers: "33.9%",
        purchases: "33.9%",
        cashWithdrawals: "35.9%",
      },
      otherFees: {
        annualFee: "£0",
        overseasTransactionFee: "2.95%",
      },
    },
  },
  {
    id: "premium-card",
    name: "Premium Card",
    provider: "Elite Bank",
    description: "Exclusive card for high earners",
    apr: 15.9,
    creditLimit: 10000,
    balanceTransferOffer: {
      rate: 0,
      duration: 12,
      fee: 2.5,
    },
    purchaseOffer: {
      rate: 0,
      duration: 6,
    },
    image:
      "https://d2bltdgfhxagqj.cloudfront.net/_next/image/?url=https%3A%2F%2Fddialhyn49dxu.cloudfront.net%2Fcards%2Fmbna2024-large.png&w=384&q=75",
    features: [
      "High credit limit",
      "Low APR",
      "Balance transfer offers",
      "Purchase protection",
      "Concierge service",
    ],
    details: [
      { detail: "Representative % APR (variable)", title: "15.9%" },
      { detail: "Credit limit", title: "£10,000" },
      {
        detail: "Balance transfer offer duration",
        title: "Up to 12 months",
      },
      { detail: "0% Purchase offer duration", title: "Up to 6 months" },
      { detail: "Balance transfer fee", title: "2.5%" },
    ],
    representativeExample: {
      title: "Representative Example",
      description:
        "If you spend £1,200 at a purchase interest rate of 15.9% p.a. (variable) your representative APR will be 15.9% APR (variable)",
    },
    eligibilityRules: [
      {
        id: "age-21-plus",
        field: "age",
        operator: "greater_than",
        value: 20,
        message: "Must be 21 or older",
      },
      {
        id: "income-50k-plus",
        field: "annualIncome",
        operator: "greater_than",
        value: 50000,
        message: "Annual income must be over £50,000",
      },
      {
        id: "not-student",
        field: "employmentStatus",
        operator: "not_in",
        value: ["Student", "Unemployed"],
        message: "Cannot be a student or unemployed",
      },
    ],
    // Additional inferred properties
    whatsGood: [
      "Up to 56 days interest-free credit on purchases",
      "Get cashback, vouchers, prize draws, and other personalized offers with Elite Boosts",
      "Up to 3 additional cardholders (with the primary cardholder responsible for payments)",
      "A promotion to win a European trip for two by spending with an Elite Mastercard debit or credit card in the UK or abroad from July 1 to December 31",
    ],
    whatsBad: ["No balance transfers from other Elite cards"],
    additionalFeatures: [
      "Elite Boosts rewards program",
      "Up to 3 additional cardholders",
      "European trip promotion",
      "Concierge service",
      "Purchase protection",
      "Travel insurance",
    ],
    eligibility: [
      "Be over 18",
      "Earn a regular income of more than £50,000 per year",
      "Have had a permanent UK address for three years or more",
      "Have no history of bankruptcy, CCJs, or an IVA in the last 6 years",
      "To be eligible for Elite Boosts, one must have a personal Elite debit or credit card, be 18 years or over, and be registered for Online and Mobile Banking",
    ],
    ratesAndFees: {
      balanceTransferOffer: {
        introRate: "0%",
        duration: "31 months",
        transferFee: "3.45%",
      },
      purchaseOffer: {
        introRate: "0%",
        duration: "3 months",
      },
      annualRates: {
        balanceTransfers: "24.9%",
        purchases: "24.9%",
        cashWithdrawals: "29.9%",
      },
      otherFees: {
        annualFee: "£0",
        overseasTransactionFee: "2.95%",
      },
    },
  },
];

// Mock API service
export class MockCreditCardAPI {
  static async getCreditCards(): Promise<CreditCard[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockCreditCards;
  }

  static async getCreditCardById(id: string): Promise<CreditCard | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockCreditCards.find((card) => card.id === id) || null;
  }
}
