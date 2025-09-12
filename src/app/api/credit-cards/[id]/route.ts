import { NextRequest, NextResponse } from "next/server";
import { MockCreditCardAPI } from "@/features/check-eligibility/services/mock-api";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Card ID is required",
        },
        { status: 400 }
      );
    }

    const card = await MockCreditCardAPI.getCreditCardById(id);

    if (!card) {
      return NextResponse.json(
        {
          success: false,
          error: "Credit card not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: card,
    });
  } catch (error) {
    console.error("Error fetching credit card:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch credit card",
      },
      { status: 500 }
    );
  }
}
