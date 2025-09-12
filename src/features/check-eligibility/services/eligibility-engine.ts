import {
  EligibilityRule,
  UserEligibilityData,
  EligibilityResult,
  CreditCard,
} from "../../../types/credit-card";

export class EligibilityEngine {
  /**
   * Evaluate a single rule against user data
   */
  private evaluateRule(
    rule: EligibilityRule,
    userData: UserEligibilityData
  ): boolean {
    const fieldValue = userData[rule.field];

    switch (rule.operator) {
      case "equals":
        return fieldValue === rule.value;

      case "greater_than":
        return Number(fieldValue) > Number(rule.value);

      case "less_than":
        return Number(fieldValue) < Number(rule.value);

      case "contains":
        return String(fieldValue)
          .toLowerCase()
          .includes(String(rule.value).toLowerCase());

      case "in":
        return (
          Array.isArray(rule.value) &&
          fieldValue !== undefined &&
          (rule.value as (string | number)[]).includes(fieldValue)
        );

      case "not_in":
        return (
          Array.isArray(rule.value) &&
          fieldValue !== undefined &&
          !(rule.value as (string | number)[]).includes(fieldValue)
        );

      default:
        return false;
    }
  }

  /**
   * Calculate eligibility for a single card
   */
  evaluateCardEligibility(
    card: CreditCard,
    userData: UserEligibilityData
  ): EligibilityResult {
    const reasons: string[] = [];
    let passedRules = 0;
    const totalRules = card.eligibilityRules.length;

    // Evaluate each rule
    for (const rule of card.eligibilityRules) {
      const isRulePassed = this.evaluateRule(rule, userData);

      if (isRulePassed) {
        passedRules++;
      } else {
        reasons.push(rule.message);
      }
    }

    const isEligible = passedRules === totalRules;
    const confidence =
      totalRules > 0 ? Math.round((passedRules / totalRules) * 100) : 0;

    return {
      card,
      isEligible,
      reasons,
      confidence,
    };
  }

  /**
   * Evaluate eligibility for multiple cards
   */
  evaluateMultipleCards(
    cards: CreditCard[],
    userData: UserEligibilityData
  ): EligibilityResult[] {
    return cards.map((card) => this.evaluateCardEligibility(card, userData));
  }

  /**
   * Get only eligible cards
   */
  getEligibleCards(
    cards: CreditCard[],
    userData: UserEligibilityData
  ): EligibilityResult[] {
    const results = this.evaluateMultipleCards(cards, userData);
    return results.filter((result) => result.isEligible);
  }

  /**
   * Get cards sorted by eligibility confidence
   */
  getCardsByConfidence(
    cards: CreditCard[],
    userData: UserEligibilityData
  ): EligibilityResult[] {
    const results = this.evaluateMultipleCards(cards, userData);
    return results.sort((a, b) => b.confidence - a.confidence);
  }
}
