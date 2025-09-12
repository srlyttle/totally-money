# TotallyMoney Credit Card Eligibility Checker - Requirements

## Project Overview
A simple UI for users to check their credit card eligibility by entering personal details and seeing which cards they qualify for.

## Technical Stack
- Next.js 15.5.2 + React 19.1.0 + TypeScript
- Tailwind CSS v4 for styling


## Core Features

### 1. User Form
**Fields**: Name, Date of Birth, Employment Status, Annual Income, House Number, Postcode
**Validation**: Real-time feedback, age 18+, UK postcode format, required fields

### 2. Credit Cards
- **Student Life Card**: Students only, £1,200 limit, 18.9% APR
- **Anywhere Card**: Everyone, £300 limit, 33.9% APR  
- **Liquid Card**: Income >£16,000, £3,000 limit, 33.9% APR

### 3. Results & Selection
- Display eligible cards with key details
- Allow multiple card selection
- Show combined credit limit
- Responsive design (mobile/tablet/desktop)

## User Stories

### Story 1: User Input Form
**As a** potential credit card applicant  
**I want to** enter my personal details in a form from new or edit current details stored 
**So that** I can check my eligibility for credit cards

**Acceptance Criteria:**
- [ ] Form has all required fields: name, DOB, employment status, income, house number, postcode
- [ ] Real-time validation shows errors immediately
- [ ] Age validation ensures user is 18+ years old
- [ ] UK postcode format is validated
- [ ] Income field accepts numbers only
- [ ] All fields are required and show error if empty
- [ ] Form submits successfully with valid data

### Story 2: Card Eligibility Check
**As a** user who has submitted my details  
**I want to** see which credit cards I'm eligible for  
**So that** I can understand my options

**Acceptance Criteria:**
- [ ] Student Life Card appears only for users with "Student" employment status
- [ ] Anywhere Card appears for all users regardless of other criteria
- [ ] Liquid Card appears only for users with income > £16,000
- [ ] Each card shows: name, APR, balance transfer offer, purchase offer, credit limit
- [ ] Cards are displayed in a clean, card-based layout
- [ ] No eligible cards message shown when user qualifies for none

### Story 3: Card Selection
**As a** user viewing eligible cards  
**I want to** select one or more cards  
**So that** I can see my total available credit

**Acceptance Criteria:**
- [ ] User can click to select/deselect cards
- [ ] Selected cards have visual feedback (highlighted/bordered)
- [ ] Combined credit limit is calculated and displayed prominently
- [ ] User can select multiple cards simultaneously
- [ ] User can clear all selections
- [ ] Total updates immediately when cards are selected/deselected

### Story 4: Responsive Design
**As a** user on any device  
**I want to** use the application comfortably  
**So that** I can check my eligibility anywhere

**Acceptance Criteria:**
- [ ] Form is usable on mobile devices (320px+ width)
- [ ] Cards display in single column on mobile
- [ ] Cards display in 2 columns on tablet (768px+)
- [ ] Cards display in 3 columns on desktop (1024px+)
- [ ] Touch targets are at least 44px for mobile
- [ ] Text is readable without zooming on all devices

### Story 5: Error Handling
**As a** user entering information  
**I want to** see clear error messages  
**So that** I can fix any issues quickly

**Acceptance Criteria:**
- [ ] Field validation errors appear below each field
- [ ] Error messages are specific and helpful
- [ ] Form cannot be submitted with invalid data
- [ ] Age validation shows "Must be 18 or older" message
- [ ] Postcode validation shows "Please enter a valid UK postcode" message
- [ ] Income validation shows "Please enter a valid amount" message

## Technical Requirements

### TypeScript Interfaces
```typescript
interface UserDetails {
  name: string;
  dateOfBirth: Date;
  employmentStatus: 'Student' | 'Employed' | 'Self-employed' | 'Unemployed' | 'Retired';
  annualIncome: number;
  houseNumber: string;
  postcode: string;
}

interface CreditCard {
  id: string;
  name: string;
  apr: number;
  balanceTransferOffer: { rate: number; duration: number };
  purchaseOffer: { rate: number; duration: number };
  creditLimit: number;
  id
}
```

### Components
- `UserForm` - Form with validation
- `CardDisplay` - Individual card component  
- `EligibilityResults` - Results container
- `CreditCalculator` - Selection and total calculation

## Definition of Done
- [ ] All user stories completed with acceptance criteria met
- [ ] Code is TypeScript with proper interfaces
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] No console errors or warnings
- [ ] Clean, maintainable code structure
