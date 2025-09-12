import { NextRequest, NextResponse } from "next/server";
import { EligibilityService } from "@/features/check-eligibility/services/eligibility-service";
import { UserDetails } from "@/features/check-eligibility/schemas/user-details";
import { z } from "zod";

const eligibilityQuerySchema = z.object({
  title: z.enum(["Mr", "Mrs", "Miss", "Ms", "Dr"]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  email: z.string().email(),
  mobile: z.string().regex(/^07\d{9}$/, "Invalid UK mobile number"),
  address: z.string().min(1),
  houseNumber: z.string().min(1),
  postcode: z
    .string()
    .regex(/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i, "Invalid UK postcode"),
  employmentStatus: z.enum([
    "Full time",
    "Part time",
    "Self employed",
    "Student",
    "Unemployed",
    "Retired",
  ]),
  annualIncome: z.string().transform((val) => parseInt(val, 10)),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params = Object.fromEntries(searchParams.entries());

    const validationResult = eligibilityQuerySchema.safeParse(params);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid query parameters",
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const validatedParams = validationResult.data;

    const [year, month, day] = validatedParams.dob.split("-");
    const userDetails: UserDetails = {
      title: validatedParams.title,
      firstName: validatedParams.firstName,
      lastName: validatedParams.lastName,
      dateOfBirth: {
        day,
        month: parseInt(month).toString(),
        year,
      },
      email: validatedParams.email,
      mobile: validatedParams.mobile,
      address: validatedParams.address,
      houseNumber: validatedParams.houseNumber,
      postcode: validatedParams.postcode,
      employmentStatus: validatedParams.employmentStatus,
      annualIncome: validatedParams.annualIncome,
    };

    const eligibilityService = new EligibilityService();
    const eligibleCards = await eligibilityService.getEligibleCards(
      userDetails
    );
    const summary = eligibilityService.getEligibilitySummary(eligibleCards);

    return NextResponse.json({
      success: true,
      data: {
        userDetails,
        eligibleCards,
        summary,
      },
    });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check eligibility. Please try again.",
      },
      { status: 500 }
    );
  }
}
