import { UseFormReturn } from "react-hook-form";
import { UserDetails } from "../schemas/user-details";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PersonalDetailsStepProps {
  form: UseFormReturn<UserDetails>;
}

const titles = ["Mr", "Mrs", "Miss", "Ms", "Dr"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const PersonalDetailsStep = ({ form }: PersonalDetailsStepProps) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = form;
  const [showTestData, setShowTestData] = useState(false);

  const generateTestData = () => {
    // Personal Details
    const firstNames = [
      "Alex",
      "Jordan",
      "Taylor",
      "Casey",
      "Morgan",
      "Riley",
      "Avery",
      "Quinn",
      "Sage",
      "Blake",
    ];
    const lastNames = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Garcia",
      "Miller",
      "Davis",
      "Rodriguez",
      "Martinez",
    ];

    const randomFirstName =
      firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName =
      lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];

    // Generate random date of birth (18-65 years old)
    const currentYear = new Date().getFullYear();
    const randomYear = currentYear - Math.floor(Math.random() * 47) - 18; // 18-65 years old
    const randomMonth = String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      "0"
    );
    const randomDay = String(Math.floor(Math.random() * 28) + 1).padStart(
      2,
      "0"
    ); // Use 28 to avoid month issues

    // Contact Details
    const domains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
    ];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    const randomEmail = `test${Math.floor(
      Math.random() * 1000
    )}@${randomDomain}`;
    const randomMobile = `07${
      Math.floor(Math.random() * 900000000) + 100000000
    }`;

    // Address Details
    const streets = [
      "High Street",
      "Main Road",
      "Church Lane",
      "Victoria Road",
      "Park Avenue",
      "Station Road",
      "Mill Lane",
      "Queen Street",
    ];
    const towns = [
      "London",
      "Manchester",
      "Birmingham",
      "Liverpool",
      "Leeds",
      "Sheffield",
      "Bristol",
      "Newcastle",
    ];
    const postcodes = [
      "SW1A 1AA",
      "M1 1AA",
      "B1 1AA",
      "L1 1AA",
      "LS1 1AA",
      "S1 1AA",
      "BS1 1AA",
      "NE1 1AA",
    ];

    const randomStreet = streets[Math.floor(Math.random() * streets.length)];
    const randomTown = towns[Math.floor(Math.random() * towns.length)];
    const randomPostcode =
      postcodes[Math.floor(Math.random() * postcodes.length)];
    const randomHouseNumber = Math.floor(Math.random() * 200) + 1;
    const randomAddress = `${randomHouseNumber} ${randomStreet}, ${randomTown} ${randomPostcode}`;

    // Employment Details
    const employmentOptions = [
      "Full time",
      "Part time",
      "Self employed",
      "Student",
      "Unemployed",
      "Retired",
    ];
    const randomEmploymentStatus =
      employmentOptions[Math.floor(Math.random() * employmentOptions.length)];
    const randomIncome = Math.floor(Math.random() * 80000) + 20000; // £20k - £100k

    // Set all values
    setValue("title", randomTitle as "Mr" | "Mrs" | "Miss" | "Ms" | "Dr");
    setValue("firstName", randomFirstName);
    setValue("lastName", randomLastName);
    setValue("dateOfBirth.day", randomDay);
    setValue("dateOfBirth.month", randomMonth);
    setValue("dateOfBirth.year", randomYear.toString());
    setValue("email", randomEmail);
    setValue("mobile", randomMobile);
    setValue("address", randomAddress);
    setValue("houseNumber", randomHouseNumber.toString());
    setValue("postcode", randomPostcode);
    setValue(
      "employmentStatus",
      randomEmploymentStatus as
        | "Full time"
        | "Part time"
        | "Self employed"
        | "Student"
        | "Unemployed"
        | "Retired"
    );
    setValue("annualIncome", randomIncome);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-900">Test Mode</h3>
            <p className="text-xs text-gray-600">
              Generate random test data for all steps
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowTestData(!showTestData)}
              className="w-full sm:w-auto"
            >
              {showTestData ? "Hide" : "Show"} Test Data
            </Button>
            {showTestData && (
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={generateTestData}
                className="w-full sm:w-auto"
              >
                Generate All Data
              </Button>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold text-gray-900 mb-3 block">
          Title
        </Label>
        <div className="flex gap-2 flex-wrap">
          {titles.map((title) => (
            <label
              key={title}
              className={`px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                form.watch("title") === title
                  ? "bg-purple-100 border-purple-500 text-purple-900"
                  : "bg-white border-gray-300 text-gray-700 hover:border-purple-300"
              }`}
            >
              <input
                type="radio"
                value={title}
                {...register("title")}
                className="sr-only"
              />
              {title}
            </label>
          ))}
        </div>
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            htmlFor="firstName"
            className="text-base font-semibold text-gray-900"
          >
            Legal first name
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className="mt-1"
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="lastName"
            className="text-base font-semibold text-gray-900"
          >
            Legal last name
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className="mt-1"
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold text-gray-900 mb-3 block">
          Date of birth
        </Label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="day" className="text-sm text-gray-600">
              Day
            </Label>
            <Input
              id="day"
              {...register("dateOfBirth.day")}
              className="mt-1"
              placeholder="10"
              maxLength={2}
            />
          </div>
          <div>
            <Label htmlFor="month" className="text-sm text-gray-600">
              Month
            </Label>
            <select
              id="month"
              {...register("dateOfBirth.month")}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={month} value={String(index + 1).padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="year" className="text-sm text-gray-600">
              Year
            </Label>
            <Input
              id="year"
              {...register("dateOfBirth.year")}
              className="mt-1"
              placeholder="1977"
              maxLength={4}
            />
          </div>
        </div>
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>
    </div>
  );
};
