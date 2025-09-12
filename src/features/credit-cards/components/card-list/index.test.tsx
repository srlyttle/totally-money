// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck - Ignore all TypeScript errors in this test file
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { CardList } from "./index";
import { mockCreditCards } from "../../../check-eligibility/services/mock-api";
import React from "react";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
};

(useRouter as jest.Mock).mockReturnValue(mockRouter);

// Use real mock data from mock-api.ts
const testCards = mockCreditCards.slice(0, 2); // Use first 2 cards for testing

describe("CardList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when hasEligibleCards is false", () => {
    it("should render eligibility hero with check eligibility button", () => {
      render(<CardList hasEligibleCards={false} cards={[]} />);

      expect(screen.getByText("Check my eligibility")).toBeInTheDocument();
      expect(
        screen.getByText("Get your free credit report")
      ).toBeInTheDocument();
      expect(
        screen.getByText("No harm to your credit rating")
      ).toBeInTheDocument();
      expect(screen.getByText("See your best offers")).toBeInTheDocument();
      expect(screen.getByText("Free forever")).toBeInTheDocument();
    });

    it("should navigate to eligibility page when button is clicked", () => {
      render(<CardList hasEligibleCards={false} cards={[]} />);

      const button = screen.getByRole("button", {
        name: "Check my eligibility",
      });
      fireEvent.click(button);

      expect(mockPush).toHaveBeenCalledWith("/check-eligibility");
    });
  });

  describe("when hasEligibleCards is true", () => {
    it("should render eligible cards count", () => {
      render(<CardList hasEligibleCards={true} cards={testCards} />);

      expect(
        screen.getByText("You have 2 pre-approved credit cards")
      ).toBeInTheDocument();
    });

    it("should render all eligible cards", () => {
      render(<CardList hasEligibleCards={true} cards={testCards} />);

      expect(
        screen.getByTestId("credit-card-title-Student Life Card")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("credit-card-title-Anywhere Card")
      ).toBeInTheDocument();
    });

    it("should show total credit limit when multiple cards are selected", async () => {
      render(<CardList hasEligibleCards={true} cards={testCards} />);

      // Select both cards by clicking on the card elements
      const cards = screen.getAllByTestId("credit-card");

      fireEvent.click(cards[0]); // Click first card
      fireEvent.click(cards[1]); // Click second card

      await waitFor(() => {
        // Get all alerts and find the one with credit limit text
        const alerts = screen.getAllByRole("alert");
        const creditLimitAlert = alerts.find((alert) =>
          alert.textContent?.includes("Your total amount of credit selected is")
        );
        expect(creditLimitAlert).toBeInTheDocument();
        expect(creditLimitAlert).toHaveTextContent(
          "Your total amount of credit selected is £ 1500"
        );
      });
    });

    it("should navigate to card detail when more details is clicked", () => {
      render(<CardList hasEligibleCards={true} cards={testCards} />);

      const moreDetailsButtons = screen.getAllByText("More details");
      fireEvent.click(moreDetailsButtons[0]); // Click the first "More details" button

      expect(mockPush).toHaveBeenCalledWith("/credit-cards/Student Life Card");
    });
  });

  describe("edge cases", () => {
    it("should handle empty cards array with eligible cards true", () => {
      render(<CardList hasEligibleCards={true} cards={[]} />);

      expect(
        screen.getByText("You have 0 pre-approved credit cards")
      ).toBeInTheDocument();
    });

    it("should handle single card selection without showing total alert", () => {
      const mockCards = [testCards[0]]; // Use first test card

      render(<CardList hasEligibleCards={true} cards={mockCards} />);

      const cards = screen.getAllByTestId("credit-card");
      fireEvent.click(cards[0]); // Click the card

      expect(
        screen.queryByText((content, element) => {
          return (
            element?.textContent?.includes(
              "Your total amount of credit selected"
            ) ?? false
          );
        })
      ).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("should have proper button accessibility", () => {
      render(<CardList hasEligibleCards={false} cards={[]} />);

      const button = screen.getByRole("button", {
        name: "Check my eligibility",
      });
      expect(button).toBeInTheDocument();
    });

    it("should have proper alert accessibility", () => {
      const mockCards = [testCards[0]]; // Use first test card
      render(<CardList hasEligibleCards={true} cards={mockCards} />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  });
});
