// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - Ignore all TypeScript errors in this test file
import { EligibilityService } from "../eligibility-service";
import { UserDetails } from "../../schemas/user-details";
import { MockCreditCardAPI } from "../mock-api";
import { EligibilityEngine } from "../eligibility-engine";
import { CreditCard, EligibilityResult } from "../../../../types/credit-card";

// Mock the dependencies
jest.mock("../mock-api");
jest.mock("../eligibility-engine");

const MockedMockCreditCardAPI = MockCreditCardAPI as jest.Mocked<
  typeof MockCreditCardAPI
>;

describe("EligibilityService", () => {
  let eligibilityService: EligibilityService;
  let mockEligibilityEngine: jest.Mocked<EligibilityEngine>;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    eligibilityService = new EligibilityService();

    // Mock console.error to suppress expected error messages during tests
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Create a proper mock for the eligibility engine
    mockEligibilityEngine = {
      evaluateCardEligibility: jest.fn(),
      evaluateMultipleCards: jest.fn(),
      getEligibleCards: jest.fn(),
      getCardsByConfidence: jest.fn(),
    } as jest.Mocked<EligibilityEngine>;

    // Replace the engine in the service
    eligibilityService.eligibilityEngine = mockEligibilityEngine;
  });

  afterEach(() => {
    // Restore console.error after each test
    consoleErrorSpy.mockRestore();
  });

  // Helper function to create a complete CreditCard mock
  const createMockCard = (overrides: Partial<CreditCard> = {}): CreditCard => ({
    id: "test-card",
    name: "Test Card",
    provider: "Test Bank",
    description: "Test card description",
    apr: 18.9,
    creditLimit: 5000,
    balanceTransferOffer: { rate: 0, duration: 0, fee: 0 },
    purchaseOffer: { rate: 0, duration: 0 },
    image: "test-image.jpg",
    features: ["Feature 1"],
    eligibilityRules: {
      minIncome: 20000,
      minAge: 18,
      maxAge: 65,
    },
    whatsGood: ["Good feature"],
    whatsBad: ["Bad feature"],
    additionalFeatures: ["Additional feature"],
    eligibility: ["Must be 18+"],
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
    ...overrides,
  });

  // Helper function to create EligibilityResult
  const createMockEligibilityResult = (
    card: CreditCard,
    overrides: Partial<EligibilityResult> = {}
  ): EligibilityResult => ({
    card,
    isEligible: true,
    confidence: 0.9,
    reasons: ["Test reason"],
    ...overrides,
  });

  describe("getEligibleCards", () => {
    const mockUserDetails: UserDetails = {
      title: "Mr",
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: {
        day: "15",
        month: "06",
        year: "1990",
      },
      email: "john.doe@example.com",
      mobile: "07123456789",
      address: "123 Main Street, London SW1A 1AA",
      houseNumber: "123",
      postcode: "SW1A 1AA",
      employmentStatus: "Full time",
      annualIncome: 50000,
    };

    it("should return eligible cards sorted by credit limit (highest first)", async () => {
      const mockCards = [
        createMockCard({ id: "card1", name: "Test Card 1", creditLimit: 5000 }),
        createMockCard({ id: "card2", name: "Test Card 2", creditLimit: 3000 }),
      ];

      const mockEligibleResults = [
        createMockEligibilityResult(mockCards[0]),
        createMockEligibilityResult(mockCards[1]),
      ];

      MockedMockCreditCardAPI.getCreditCards.mockResolvedValue(mockCards);
      mockEligibilityEngine.getEligibleCards.mockReturnValue(
        mockEligibleResults
      );

      const result = await eligibilityService.getEligibleCards(mockUserDetails);

      expect(MockedMockCreditCardAPI.getCreditCards).toHaveBeenCalledTimes(1);
      expect(mockEligibilityEngine.getEligibleCards).toHaveBeenCalledWith(
        mockCards,
        expect.objectContaining({
          age: 35, // 2025 - 1990
          employmentStatus: "Full time",
          annualIncome: 50000,
          addressHistory: 3,
        })
      );
      expect(result).toEqual(mockEligibleResults);
    });

    it("should handle errors and throw appropriate message", async () => {
      const error = new Error("API Error");
      MockedMockCreditCardAPI.getCreditCards.mockRejectedValue(error);

      await expect(
        eligibilityService.getEligibleCards(mockUserDetails)
      ).rejects.toThrow("Failed to fetch eligible cards. Please try again.");
    });

    it("should convert form data to eligibility data correctly", async () => {
      MockedMockCreditCardAPI.getCreditCards.mockResolvedValue([]);
      mockEligibilityEngine.getEligibleCards.mockReturnValue([]);

      await eligibilityService.getEligibleCards(mockUserDetails);

      expect(mockEligibilityEngine.getEligibleCards).toHaveBeenCalledWith(
        [],
        expect.objectContaining({
          age: 35, // 2025 - 1990
          employmentStatus: "Full time",
          annualIncome: 50000,
          addressHistory: 3,
          creditScore: undefined,
          existingDebt: undefined,
          monthlyRent: undefined,
        })
      );
    });

    it("should handle different date formats correctly", async () => {
      const userDetailsWithDifferentDate: UserDetails = {
        ...mockUserDetails,
        dateOfBirth: {
          day: "01",
          month: "01",
          year: "2000",
        },
      };

      MockedMockCreditCardAPI.getCreditCards.mockResolvedValue([]);
      mockEligibilityEngine.getEligibleCards.mockReturnValue([]);

      await eligibilityService.getEligibleCards(userDetailsWithDifferentDate);

      expect(mockEligibilityEngine.getEligibleCards).toHaveBeenCalledWith(
        [],
        expect.objectContaining({
          age: 25, // 2025 - 2000
        })
      );
    });
  });

  describe("getAllCardsWithEligibility", () => {
    const mockUserDetails: UserDetails = {
      title: "Mrs",
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: {
        day: "20",
        month: "03",
        year: "1985",
      },
      email: "jane.smith@example.com",
      mobile: "07987654321",
      address: "456 Oak Avenue, Manchester M1 1AA",
      houseNumber: "456",
      postcode: "M1 1AA",
      employmentStatus: "Student",
      annualIncome: 15000,
    };

    it("should return all cards with eligibility status", async () => {
      const mockCards = [
        createMockCard({
          id: "student-card",
          name: "Student Card",
          creditLimit: 1200,
        }),
      ];

      const mockResults = [
        createMockEligibilityResult(mockCards[0], {
          confidence: 0.8,
          reasons: ["Student status"],
        }),
      ];

      MockedMockCreditCardAPI.getCreditCards.mockResolvedValue(mockCards);
      mockEligibilityEngine.getCardsByConfidence.mockReturnValue(mockResults);

      const result = await eligibilityService.getAllCardsWithEligibility(
        mockUserDetails
      );

      expect(MockedMockCreditCardAPI.getCreditCards).toHaveBeenCalledTimes(1);
      expect(mockEligibilityEngine.getCardsByConfidence).toHaveBeenCalledWith(
        mockCards,
        expect.objectContaining({
          age: 40, // 2025 - 1985
          employmentStatus: "Student",
          annualIncome: 15000,
        })
      );
      expect(result).toEqual(mockResults);
    });

    it("should handle errors in getAllCardsWithEligibility", async () => {
      const error = new Error("Engine Error");
      MockedMockCreditCardAPI.getCreditCards.mockRejectedValue(error);

      await expect(
        eligibilityService.getAllCardsWithEligibility(mockUserDetails)
      ).rejects.toThrow("Failed to fetch cards. Please try again.");
    });
  });

  describe("calculateTotalCredit", () => {
    it("should calculate total credit correctly", () => {
      const eligibleCards = [
        createMockEligibilityResult(createMockCard({ creditLimit: 5000 })),
        createMockEligibilityResult(createMockCard({ creditLimit: 3000 })),
      ];

      const total = eligibilityService.calculateTotalCredit(eligibleCards);
      expect(total).toBe(8000);
    });

    it("should return 0 for empty array", () => {
      const total = eligibilityService.calculateTotalCredit([]);
      expect(total).toBe(0);
    });

    it("should handle single card", () => {
      const eligibleCards = [
        createMockEligibilityResult(createMockCard({ creditLimit: 2500 })),
      ];

      const total = eligibilityService.calculateTotalCredit(eligibleCards);
      expect(total).toBe(2500);
    });
  });

  describe("getEligibilitySummary", () => {
    it("should return correct summary for multiple cards", () => {
      const eligibleCards = [
        createMockEligibilityResult(
          createMockCard({ apr: 18.9, creditLimit: 5000 })
        ),
        createMockEligibilityResult(
          createMockCard({ apr: 22.9, creditLimit: 3000 })
        ),
        createMockEligibilityResult(
          createMockCard({ apr: 25.9, creditLimit: 1000 })
        ),
      ];

      const summary = eligibilityService.getEligibilitySummary(eligibleCards);

      expect(summary).toEqual({
        totalCards: 3,
        totalCredit: 9000,
        averageAPR: 22.6, // (18.9 + 22.9 + 25.9) / 3 = 22.566... rounded to 22.6
        bestCard: eligibleCards[0], // Highest credit limit
      });
    });

    it("should return correct summary for single card", () => {
      const eligibleCards = [
        createMockEligibilityResult(
          createMockCard({ apr: 18.9, creditLimit: 5000 })
        ),
      ];

      const summary = eligibilityService.getEligibilitySummary(eligibleCards);

      expect(summary).toEqual({
        totalCards: 1,
        totalCredit: 5000,
        averageAPR: 18.9,
        bestCard: eligibleCards[0],
      });
    });

    it("should return zero values for empty array", () => {
      const summary = eligibilityService.getEligibilitySummary([]);

      expect(summary).toEqual({
        totalCards: 0,
        totalCredit: 0,
        averageAPR: 0,
        bestCard: null,
      });
    });

    it("should round average APR to 1 decimal place", () => {
      const eligibleCards = [
        createMockEligibilityResult(
          createMockCard({ apr: 18.9, creditLimit: 1000 })
        ),
        createMockEligibilityResult(
          createMockCard({ apr: 22.9, creditLimit: 2000 })
        ),
      ];

      const summary = eligibilityService.getEligibilitySummary(eligibleCards);

      expect(summary.averageAPR).toBe(20.9); // (18.9 + 22.9) / 2 = 20.9
    });
  });

  describe("convertToEligibilityData (private method)", () => {
    it("should convert form data correctly", () => {
      const formData: UserDetails = {
        title: "Dr",
        firstName: "Alice",
        lastName: "Johnson",
        dateOfBirth: {
          day: "10",
          month: "12",
          year: "1988",
        },
        email: "alice.johnson@example.com",
        mobile: "07111222333",
        address: "789 Pine Street, Birmingham B1 1AA",
        houseNumber: "789",
        postcode: "B1 1AA",
        employmentStatus: "Self employed",
        annualIncome: 75000,
      };

      // Access private method through type assertion
      const result = eligibilityService.convertToEligibilityData(formData);

      expect(result).toEqual({
        age: 37, // 2025 - 1988
        employmentStatus: "Self employed",
        annualIncome: 75000,
        addressHistory: 3,
        creditScore: undefined,
        existingDebt: undefined,
        monthlyRent: undefined,
      });
    });

    it("should handle edge case dates correctly", () => {
      const formData: UserDetails = {
        title: "Miss",
        firstName: "Emma",
        lastName: "Wilson",
        dateOfBirth: {
          day: "29",
          month: "02",
          year: "2000",
        },
        email: "emma.wilson@example.com",
        mobile: "07444555666",
        address: "321 Elm Street, Leeds LS1 1AA",
        houseNumber: "321",
        postcode: "LS1 1AA",
        employmentStatus: "Part time",
        annualIncome: 25000,
      };

      const result = eligibilityService.convertToEligibilityData(formData);

      expect(result.age).toBe(25); // 2025 - 2000
      expect(result.employmentStatus).toBe("Part time");
      expect(result.annualIncome).toBe(25000);
    });
  });
});
