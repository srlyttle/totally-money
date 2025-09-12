/// <reference types="cypress" />

describe("TotallyMoney Credit Card Eligibility Checker", () => {
  beforeEach(() => {
    // Visit the credit cards page
    cy.visit("http://localhost:3000/credit-cards");
  });

  describe("Initial Page Load", () => {
    it("should display the credit cards page with eligibility banner", () => {
      // Check page title
      // cy.get("a").should("contain", "Credit cards");

      // Check for TotallyMoney logo
      cy.get("a").should("contain", "TotallyMoney");

      // Check for eligibility banner
      cy.get("button").contains("Check my eligibility").should("be.visible");

      // Check for benefits list
      cy.contains("Get your free credit report").should("be.visible");
      cy.contains("No harm to your credit rating").should("be.visible");
      cy.contains("See your best offers").should("be.visible");
      cy.contains("Free forever").should("be.visible");
    });

    it("should display credit card offers", () => {
      // Set viewport to desktop size to ensure cards are visible
      cy.viewport(1024, 768);

      // Wait for page to load
      cy.wait(1000);

      // Check for Student Life Card - use more specific selector
      cy.get("body").should("contain", "Student Life Card");
      cy.get("body").should("contain", "18.9%");
      cy.get("body").should("contain", "£1,200");

      // Check for Anywhere Card
      cy.get("body").should("contain", "Anywhere Card");
      cy.get("body").should("contain", "33.9%");
      cy.get("body").should("contain", "£300");
    });
  });

  describe("Eligibility Check Flow", () => {
    it("should navigate to eligibility form when clicking Check my eligibility", () => {
      cy.get("button").contains("Check my eligibility").first().click();
      cy.url().should("include", "/check-eligibility");
    });

    it("should complete full eligibility form for student scenario", () => {
      // Set desktop viewport
      cy.viewport(1024, 768);

      // Navigate to eligibility form
      cy.get("button").contains("Check my eligibility").first().click();
      cy.url().should("include", "/check-eligibility");

      // Personal Details Step
      cy.get("label").contains("Miss").click(); // Changed from input[value='Miss'] to label
      cy.get("input[name='firstName']").type("Riley");
      cy.get("input[name='lastName']").type("Brown");
      cy.get("input[name='dateOfBirth.day']").type("15");
      cy.get("select[name='dateOfBirth.month']").select("06");
      cy.get("input[name='dateOfBirth.year']").type("1995");

      // Click Next
      cy.get("button").contains("Next").click();

      // Contact Step
      cy.get("input[name='email']").type("riley.brown@example.com");
      cy.get("input[name='mobile']").type("07456541467");

      // Click Next
      cy.get("button").contains("Next").click();

      // Address Step
      cy.get("input[placeholder='Search for address']").type("123 Main Street");
      cy.get("div").contains("123 Main Street, London SW1A 1AA").click();
      cy.get("input[name='houseNumber']").type("123");
      cy.get("input[name='postcode']").type("SW1A 1AA");

      // Click Next
      cy.get("button").contains("Next").click();

      // Employment Step
      cy.get("label").contains("Student").click();
      cy.get("input[name='annualIncome']").type("15000");

      // Submit form
      cy.get("button").contains("Submit").click();

      // Should redirect back to credit cards page
      cy.url().should("include", "/credit-cards");
    });

    it("should complete full eligibility form for employed scenario", () => {
      // Set desktop viewport
      cy.viewport(1024, 768);

      // Navigate to eligibility form
      cy.get("button").contains("Check my eligibility").first().click();
      cy.url().should("include", "/check-eligibility");

      // Personal Details Step
      cy.get("label").contains("Mr").click(); // Changed from input[value='Mr'] to label
      cy.get("input[name='firstName']").type("John");
      cy.get("input[name='lastName']").type("Smith");
      cy.get("input[name='dateOfBirth.day']").type("10");
      cy.get("select[name='dateOfBirth.month']").select("03");
      cy.get("input[name='dateOfBirth.year']").type("1985");

      // Click Next
      cy.get("button").contains("Next").click();

      // Contact Step
      cy.get("input[name='email']").type("john.smith@example.com");
      cy.get("input[name='mobile']").type("07123456789");

      // Click Next
      cy.get("button").contains("Next").click();

      // Address Step
      cy.get("input[placeholder='Search for address']").type("45 High Street");
      cy.get("div").contains("45 High Street, Manchester M1 1AA").click();
      cy.get("input[name='houseNumber']").type("45");
      cy.get("input[name='postcode']").type("M1 1AA");

      // Click Next
      cy.get("button").contains("Next").click();

      // Employment Step
      cy.get("label").contains("Full time").click();
      cy.get("input[name='annualIncome']").type("50000");

      // Submit form
      cy.get("button").contains("Submit").click();

      // Should redirect back to credit cards page
      cy.url().should("include", "/credit-cards");
    });
  });

  describe("Form Validation", () => {
    beforeEach(() => {
      cy.viewport(1024, 768);
      cy.get("button").contains("Check my eligibility").first().click();
      cy.url().should("include", "/check-eligibility");
    });

    it("should validate required fields in personal details step", () => {
      // Try to proceed without filling required fields
      cy.get("button").contains("Next").click();

      // Should show validation errors - look for any of the specific error messages
      cy.get("p").contains("is required").should("be.visible");
    });

    it("should validate age requirement (18+)", () => {
      // Enter date of birth for someone under 18
      cy.get("input[name='dateOfBirth.day']").type("15");
      cy.get("select[name='dateOfBirth.month']").select("06");
      cy.get("input[name='dateOfBirth.year']").type("2010"); // 14 years old

      cy.get("button").contains("Next").click();

      // Should show age validation error
      cy.get("p").contains("Must be 18 or older").should("be.visible");
    });

    it("should validate email format", () => {
      // Fill personal details
      cy.get("label").contains("Mr").click(); // Changed from input[value='Mr'] to label
      cy.get("input[name='firstName']").type("John");
      cy.get("input[name='lastName']").type("Smith");
      cy.get("input[name='dateOfBirth.day']").type("10");
      cy.get("select[name='dateOfBirth.month']").select("03");
      cy.get("input[name='dateOfBirth.year']").type("1985");

      cy.get("button").contains("Next").click();

      // Enter invalid email
      cy.get("input[name='email']").type("invalid-email");
      cy.get("button").contains("Next").click();

      // Should show email validation error
      cy.get("p").contains("Invalid email format").should("be.visible");
    });

    it("should validate UK postcode format", () => {
      // Fill personal and contact details
      cy.get("label").contains("Mr").click(); // Changed from input[value='Mr'] to label
      cy.get("input[name='firstName']").type("John");
      cy.get("input[name='lastName']").type("Smith");
      cy.get("input[name='dateOfBirth.day']").type("10");
      cy.get("select[name='dateOfBirth.month']").select("03");
      cy.get("input[name='dateOfBirth.year']").type("1985");

      cy.get("button").contains("Next").click();

      cy.get("input[name='email']").type("john@example.com");
      cy.get("input[name='mobile']").type("07123456789");

      cy.get("button").contains("Next").click();

      // Enter invalid postcode
      cy.get("input[name='postcode']").type("INVALID");
      cy.get("button").contains("Next").click();

      // Should show postcode validation error
      cy.get("p").contains("Invalid UK postcode").should("be.visible");
    });
  });

  describe("Eligible Cards Display", () => {
    it("should show eligible cards after form submission", () => {
      // Set desktop viewport
      cy.viewport(1024, 768);

      // Complete form as student
      cy.get("button").contains("Check my eligibility").first().click();

      // Fill form
      cy.get("label").contains("Mr").click(); // Changed from input[value='Mr'] to label
      cy.get("input[name='firstName']").type("Riley");
      cy.get("input[name='lastName']").type("Brown");
      cy.get("input[name='dateOfBirth.day']").type("15");
      cy.get("select[name='dateOfBirth.month']").select("06");
      cy.get("input[name='dateOfBirth.year']").type("1995");
      cy.get("button").contains("Next").click();

      cy.get("input[name='email']").type("riley@example.com");
      cy.get("input[name='mobile']").type("07456541467");
      cy.get("button").contains("Next").click();

      cy.get("input[placeholder='Search for address']").type("123 Main Street");
      cy.get("div").contains("123 Main Street, London SW1A 1AA").click();
      cy.get("input[name='houseNumber']").type("123");
      cy.get("input[name='postcode']").type("SW1A 1AA");
      cy.get("button").contains("Next").click();

      cy.get("label").contains("Student").click();
      cy.get("input[name='annualIncome']").type("15000");
      cy.get("button").contains("Submit").click();

      // Should show eligible cards
      cy.get("body").should("contain", "You have 2 pre-approved credit cards");
      cy.get("body").should("contain", "Edit my details");
    });

    it("should show Student Life Card for students", () => {
      // Set desktop viewport
      cy.viewport(1024, 768);

      // Complete form as student
      cy.get("button").contains("Check my eligibility").first().click();

      // Fill form with student status
      cy.get("label").contains("Mr").click(); // Changed from input[value='Mr'] to label
      cy.get("input[name='firstName']").type("Riley");
      cy.get("input[name='lastName']").type("Brown");
      cy.get("input[name='dateOfBirth.day']").type("15");
      cy.get("select[name='dateOfBirth.month']").select("06");
      cy.get("input[name='dateOfBirth.year']").type("1995");
      cy.get("button").contains("Next").click();

      cy.get("input[name='email']").type("riley@example.com");
      cy.get("input[name='mobile']").type("07456541467");
      cy.get("button").contains("Next").click();

      cy.get("input[placeholder='Search for address']").type("123 Main Street");
      cy.get("div").contains("123 Main Street, London SW1A 1AA").click();
      cy.get("input[name='houseNumber']").type("123");
      cy.get("input[name='postcode']").type("SW1A 1AA");
      cy.get("button").contains("Next").click();

      cy.get("label").contains("Student").click();
      cy.get("input[name='annualIncome']").type("15000");
      cy.get("button").contains("Submit").click();

      // Should show Student Life Card
      cy.get("body").should("contain", "Student Life Card");
      cy.get("body").should("contain", "18.9%");
      cy.get("body").should("contain", "£1,200");

      // Should show Anywhere Card
      cy.get("body").should("contain", "Anywhere Card");
      cy.get("body").should("contain", "33.9%");
      cy.get("body").should("contain", "£300");
    });

    it("should show Liquid Card for high income users", () => {
      // Set desktop viewport
      cy.viewport(1024, 768);

      // Complete form with high income
      cy.get("button").contains("Check my eligibility").first().click();

      // Fill form with high income
      cy.get("label").contains("Mr").click();
      cy.get("input[name='firstName']").type("John");
      cy.get("input[name='lastName']").type("Smith");
      cy.get("input[name='dateOfBirth.day']").type("10");
      cy.get("select[name='dateOfBirth.month']").select("03");
      cy.get("input[name='dateOfBirth.year']").type("1985");
      cy.get("button").contains("Next").click();

      cy.get("input[name='email']").type("john@example.com");
      cy.get("input[name='mobile']").type("07123456789");
      cy.get("button").contains("Next").click();

      cy.get("input[placeholder='Search for address']").type("45 High Street");
      cy.get("div").contains("45 High Street, Manchester M1 1AA").click();
      cy.get("input[name='houseNumber']").type("45");
      cy.get("input[name='postcode']").type("M1 1AA");
      cy.get("button").contains("Next").click();

      cy.get("label").contains("Full time").click();
      cy.get("input[name='annualIncome']").type("50000"); // > £16,000
      cy.get("button").contains("Submit").click();

      // Should show Liquid Card
      cy.get("body").should("contain", "Liquid Card");
      cy.get("body").should("contain", "33.9%");
      cy.get("body").should("contain", "£3,000");
    });

    it("should show Anywhere Card for all users", () => {
      // Set desktop viewport
      cy.viewport(1024, 768);

      // Complete form with any status
      cy.get("button").contains("Check my eligibility").first().click();

      // Fill form
      cy.get("label").contains("Mr").click(); // Changed from input[value='Mr'] to label
      cy.get("input[name='firstName']").type("John");
      cy.get("input[name='lastName']").type("Smith");
      cy.get("input[name='dateOfBirth.day']").type("10");
      cy.get("select[name='dateOfBirth.month']").select("03");
      cy.get("input[name='dateOfBirth.year']").type("1985");
      cy.get("button").contains("Next").click();

      cy.get("input[name='email']").type("john@example.com");
      cy.get("input[name='mobile']").type("07123456789");
      cy.get("button").contains("Next").click();

      cy.get("input[placeholder='Search for address']").type("45 High Street");
      cy.get("div").contains("45 High Street, Manchester M1 1AA").click();
      cy.get("input[name='houseNumber']").type("45");
      cy.get("input[name='postcode']").type("M1 1AA");
      cy.get("button").contains("Next").click();

      cy.get("label").contains("Unemployed").click();
      cy.get("input[name='annualIncome']").type("0");
      cy.get("button").contains("Submit").click();

      // Should show Anywhere Card (available to all)
      cy.get("body").should("contain", "Anywhere Card");
      cy.get("body").should("contain", "33.9%");
      cy.get("body").should("contain", "£300");
    });
  });
});
