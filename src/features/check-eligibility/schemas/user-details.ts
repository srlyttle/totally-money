import { z } from "zod";

// Step-specific schemas
export const personalDetailsSchema = z.object({
  title: z.enum(["Mr", "Mrs", "Miss", "Ms", "Dr"], {
    required_error: "Please select a title",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .object({
      day: z.string().min(1, "Day is required"),
      month: z.string().min(1, "Month is required"),
      year: z.string().min(1, "Year is required"),
    })
    .refine((data) => {
      const date = new Date(
        parseInt(data.year),
        parseInt(data.month) - 1,
        parseInt(data.day)
      );
      return !isNaN(date.getTime());
    }, "Please enter a valid date")
    .refine((data) => {
      const date = new Date(
        parseInt(data.year),
        parseInt(data.month) - 1,
        parseInt(data.day)
      );
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 18;
    }, "Must be 18 or older"),
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email format"),
  mobile: z.string().regex(/^07\d{9}$/, "Invalid UK mobile number"),
});

export const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  houseNumber: z.string().min(1, "House number is required"),
  postcode: z
    .string()
    .regex(/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i, "Invalid UK postcode"),
});

export const employmentSchema = z.object({
  employmentStatus: z.enum(
    [
      "Full time",
      "Part time",
      "Self employed",
      "Student",
      "Unemployed",
      "Retired",
    ],
    {
      required_error: "Please select employment status",
    }
  ),
  annualIncome: z.number().min(0, "Income must be positive"),
});

// Complete schema for final validation
export const userDetailsSchema = z.object({
  title: z.enum(["Mr", "Mrs", "Miss", "Ms", "Dr"], {
    required_error: "Please select a title",
  }),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .object({
      day: z.string().min(1, "Day is required"),
      month: z.string().min(1, "Month is required"),
      year: z.string().min(1, "Year is required"),
    })
    .refine((data) => {
      const date = new Date(
        parseInt(data.year),
        parseInt(data.month) - 1,
        parseInt(data.day)
      );
      return !isNaN(date.getTime());
    }, "Please enter a valid date")
    .refine((data) => {
      const date = new Date(
        parseInt(data.year),
        parseInt(data.month) - 1,
        parseInt(data.day)
      );
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 18;
    }, "Must be 18 or older"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().regex(/^07\d{9}$/, "Invalid UK mobile number"),
  address: z.string().min(1, "Address is required"),
  houseNumber: z.string().min(1, "House number is required"),
  postcode: z
    .string()
    .regex(/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i, "Invalid UK postcode"),
  employmentStatus: z.enum(
    [
      "Full time",
      "Part time",
      "Self employed",
      "Student",
      "Unemployed",
      "Retired",
    ],
    {
      required_error: "Please select employment status",
    }
  ),
  annualIncome: z.number().min(0, "Income must be positive"),
});

export type UserDetails = z.infer<typeof userDetailsSchema>;
