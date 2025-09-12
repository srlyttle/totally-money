import { NextResponse } from "next/server";
import { MockCreditCardAPI } from "@/features/check-eligibility/services/mock-api";
import { CreditCard } from "@/types/credit-card";

interface SuccessResponse {
  success: true;
  data: CreditCard[];
}

interface ErrorResponse {
  success: false;
  error: string;
}

export async function GET(): Promise<
  NextResponse<SuccessResponse | ErrorResponse>
> {
  try {
    const cards = await MockCreditCardAPI.getCreditCards();

    return NextResponse.json({
      success: true,
      data: cards,
    });
  } catch (error) {
    console.error("Error fetching credit cards:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch credit cards";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
