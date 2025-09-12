import { UserDetails } from "../schemas/user-details";
import {
  UserEligibilityData,
  EligibilityResult,
} from "../../../types/credit-card";
import { MockCreditCardAPI } from "./mock-api";
import { EligibilityEngine } from "./eligibility-engine";

export class EligibilityService {
  private eligibilityEngine = new EligibilityEngine();

  /**
   * Convert form data to eligibility data
   */
  private convertToEligibilityData(formData: UserDetails): UserEligibilityData {
    const birthDate = new Date(
      parseInt(formData.dateOfBirth.year),
      parseInt(formData.dateOfBirth.month) - 1,
      parseInt(formData.dateOfBirth.day)
    );
    const age = new Date().getFullYear() - birthDate.getFullYear();

    // Calculate address history (simplified - in real app this would be more complex)
    const addressHistory = 3; // Default to 3 years for demo

    return {
      age,
      employmentStatus: formData.employmentStatus,
      annualIncome: formData.annualIncome,
      addressHistory,
      // These would come from credit bureau in real app
      creditScore: undefined,
      existingDebt: undefined,
      monthlyRent: undefined,
    };
  }

  /**
   * Get eligible credit cards for user
   */
  async getEligibleCards(formData: UserDetails): Promise<EligibilityResult[]> {
    try {
      // Fetch all available cards
      const allCards = await MockCreditCardAPI.getCreditCards();

      // Convert form data to eligibility format
      const eligibilityData = this.convertToEligibilityData(formData);

      // Get eligible cards
      const eligibleCards = this.eligibilityEngine.getEligibleCards(
        allCards,
        eligibilityData
      );

      // Sort by credit limit (highest first) for better user experience
      return eligibleCards.sort(
        (a, b) => b.card.creditLimit - a.card.creditLimit
      );
    } catch (error) {
      console.error("Error fetching eligible cards:", error);
      throw new Error("Failed to fetch eligible cards. Please try again.");
    }
  }

  /**
   * Get all cards with eligibility status (for debugging/analysis)
   */
  async getAllCardsWithEligibility(
    formData: UserDetails
  ): Promise<EligibilityResult[]> {
    try {
      const allCards = await MockCreditCardAPI.getCreditCards();
      const eligibilityData = this.convertToEligibilityData(formData);

      return this.eligibilityEngine.getCardsByConfidence(
        allCards,
        eligibilityData
      );
    } catch (error) {
      console.error("Error fetching cards with eligibility:", error);
      throw new Error("Failed to fetch cards. Please try again.");
    }
  }

  /**
   * Calculate total available credit
   */
  calculateTotalCredit(eligibleCards: EligibilityResult[]): number {
    return eligibleCards.reduce(
      (total, result) => total + result.card.creditLimit,
      0
    );
  }

  /**
   * Get eligibility summary
   */
  getEligibilitySummary(eligibleCards: EligibilityResult[]): {
    totalCards: number;
    totalCredit: number;
    averageAPR: number;
    bestCard: EligibilityResult | null;
  } {
    const totalCredit = this.calculateTotalCredit(eligibleCards);
    const averageAPR =
      eligibleCards.length > 0
        ? eligibleCards.reduce((sum, result) => sum + result.card.apr, 0) /
          eligibleCards.length
        : 0;

    const bestCard =
      eligibleCards.length > 0
        ? eligibleCards.reduce((best, current) =>
            current.card.creditLimit > best.card.creditLimit ? current : best
          )
        : null;

    return {
      totalCards: eligibleCards.length,
      totalCredit,
      averageAPR: Math.round(averageAPR * 10) / 10,
      bestCard,
    };
  }
}
