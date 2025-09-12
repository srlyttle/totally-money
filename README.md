# 💳 Totally Money - Credit Card Eligibility App

A modern Next.js application that helps users check their eligibility for credit cards and find the best offers based on their financial profile.

## 🚀 Features

- **Credit Card Eligibility Check** - Multi-step wizard to assess user eligibility
- **Card Recommendations** - Personalized credit card suggestions
- **Real-time Validation** - Form validation with instant feedback
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Comprehensive Testing** - Unit tests (Jest) and E2E tests (Cypress)
- **Type Safety** - Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI/Shadcn + Custom components
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Query (TanStack Query)
- **Testing**: Jest + React Testing Library + Cypress
- **Code Quality**: ESLint + Prettier

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd totally-money
```

### 2. Install dependencies
```bash
# Install all dependencies
npm install

# Or if you prefer yarn
yarn install

# Or if you prefer pnpm
pnpm install
```

### 3. Run the development server
```bash
npm run dev
```

A working example of the app exists at 
https://totally-money.vercel.app/credit-cards


Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Verify installation
- The app should load without errors
- You should see the credit card eligibility interface
- Navigate to `/credit-cards` to see the main application

## 🧪 Testing

This project includes cypress and unit testing at multiple levels:

### Unit Tests (Jest)
```bash
# Run all unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### E2E Tests (Cypress)

#### Running Cypress Tests Locally

**Option 1: Interactive Mode (Recommended for Development)**
```bash
# Open Cypress Test Runner UI
npm run cypress:open
```
This opens the Cypress Test Runner where you can:
- See all available tests
- Run individual tests
- Watch tests run in real-time
- Debug test failures
- See browser interactions

**Option 2: Headless Mode (CI/Production)**
```bash
# Run all E2E tests headlessly
npm run cypress:run

# Run only sanity tests (faster, recommended for CI)
npm run cypress:run:sanity

# Run specific test file
npx cypress run --spec "cypress/e2e/1-credit-card-sanity-test/eligibility.cy.js"
```

**Option 3: Combined Testing**
```bash
# Run all tests (unit + E2E)
npm run test:ci
```

#### Cypress Test Structure
```
cypress/e2e/
├── 1-credit-card-sanity-test/     # Core functionality tests
│   ├── eligibility.cy.js         # Eligibility flow tests
│   └── todo.cy.js                # Basic functionality tests
└── 2-advanced-examples/          # Advanced Cypress examples
    ├── actions.cy.js
    ├── aliasing.cy.js
    └── ... (many more)
```

#### Prerequisites for Cypress
- Make sure the development server is running (`npm run dev`)
- Tests will automatically start the app if needed
- Chrome browser is recommended (comes with Cypress)

## 🚀 CI/CD Pipeline

This project uses GitHub Actions for automated testing and deployment:

### Automated Testing
- **Unit Tests**: Runs Jest tests on every push and pull request
- **E2E Tests**: Runs Cypress sanity tests on every push and pull request
- **Build Verification**: Ensures the app builds successfully before deployment

### Workflow Files
- **`.github/workflows/tests.yml`** - Main testing pipeline
- **`.github/workflows/ci.yml`** - Comprehensive CI pipeline

### Node.js Version
- **CI Environment**: Node.js 22 (latest LTS)
- **Local Development**: Use Node.js 22+ (see `.nvmrc` file)

### Pre-commit Hooks
- **Husky**: Runs tests before commits
- **Code Quality**: Ensures code quality before pushing

### Workflow Triggers
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

### Test Results
- ✅ **Green**: All tests passed
- ❌ **Red**: Tests failed (check the Actions tab for details)
- 🟡 **Yellow**: Tests are running

