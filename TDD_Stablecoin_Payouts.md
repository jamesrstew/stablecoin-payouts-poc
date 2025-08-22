# Technical Design Document: Stablecoin Payouts POC
 
## Executive Summary
This TDD outlines the implementation of a functional POC for Deel's "Get Paid in Crypto" feature, enabling USDC payroll payouts through a hosted wallet experience. The POC uses static mock data to demonstrate core user flows for demo purposes.

## System Architecture

### Tech Stack
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Shadcn/UI components
- **State Management**: React Context API with local storage persistence
- **Mock Data**: Static JSON files imported directly into components
- **Styling**: Tailwind CSS with custom Deel-inspired design system

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Application                     │
│                      (Next.js)                             │
│                                                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ Admin Dashboard │  │ Employee Portal │  │ Static Mock │ │
│  │                 │  │                 │  │ Data Files  │ │
│  │ • Settings      │  │ • Wallet View   │  │             │ │
│  │ • Analytics     │  │ • Transactions  │  │ • users.json│ │
│  │ • Payroll       │  │ • KYC Flow      │  │ • wallets.  │ │
│  │ • Audit Logs    │  │ • Cash-out      │  │ • txns.json │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Core Features & User Stories

### 1. Employer Admin Dashboard
**User Story**: As a payroll ops manager, I want to enable crypto payouts for employees and monitor usage.

**Features**:
- Toggle crypto payouts on/off for organization
- View employee adoption metrics
- Execute payroll runs with crypto options
- Audit log of all crypto transactions
- Compliance reporting dashboard

**Data Sources**:
- Static organization settings from `data/organization.json`
- Employee metrics calculated from `data/users.json`
- Payroll data from `data/payroll.json`
- Audit logs from `data/transactions.json`

### 2. Employee Wallet Interface
**User Story**: As an employee, I want to opt into USDC payouts and manage my crypto wallet balance.

**Features**:
- Opt-in/opt-out of crypto payouts during onboarding
- View wallet balance in USD and USDC
- Transaction history with filtering
- Cash-out options (bank transfer, debit card)
- Convert USDC to fiat

**Data Sources**:
- User wallet data from `data/wallets.json`
- Transaction history from `data/transactions.json`
- User preferences stored in local storage
- Cash-out simulations with mock responses

### 3. KYC/Compliance Flow
**User Story**: As a compliance officer, I need to ensure all crypto payouts are properly verified and auditable.

**Features**:
- Identity verification workflow
- KYC status tracking
- AML compliance checks
- Document upload and verification
- Compliance dashboard

**Data Sources**:
- KYC status from `data/users.json`
- Mock document verification workflow
- Compliance reports generated from transaction data
- Simulated verification process with delays

## Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'admin';
  organizationId: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  cryptoOptIn: boolean;
  createdAt: Date;
}
```

### Wallet
```typescript
interface Wallet {
  id: string;
  userId: string;
  usdcBalance: number;
  usdBalance: number;
  address: string; // Mock wallet address
  status: 'active' | 'frozen' | 'pending';
}
```

### Transaction
```typescript
interface Transaction {
  id: string;
  walletId: string;
  type: 'payroll' | 'cashout' | 'conversion';
  amount: number;
  currency: 'USDC' | 'USD';
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  description: string;
  metadata?: any;
}
```

### Organization
```typescript
interface Organization {
  id: string;
  name: string;
  cryptoEnabled: boolean;
  settings: {
    allowedCountries: string[];
    maxMonthlyLimit: number;
    kycRequired: boolean;
  };
}
```

## Implementation Plan

### Phase 1: Project Setup (20 minutes)
1. Initialize Next.js project with TypeScript
2. Configure Tailwind CSS and Shadcn/UI
3. Create basic project structure and routing
4. Set up static mock data JSON files
5. Create data utility functions for mock data access

### Phase 2: Static Data & Context (30 minutes)
1. Create comprehensive mock data files
2. Build React Context for state management
3. Implement data filtering and search utilities
4. Set up local storage persistence
5. Create mock authentication flow

### Phase 3: Frontend Implementation (75 minutes)
1. Build admin dashboard with charts and controls
2. Create employee wallet interface
3. Implement KYC verification flow
4. Add responsive navigation and layout
5. Build payroll execution interface
6. Add transaction filtering and search

### Phase 4: Demo Preparation (40 minutes)
1. Create realistic demo scenarios with rich mock data
2. Add loading states and simulated delays
3. Implement error handling for edge cases
4. Polish UI/UX for presentation
5. Test all user flows end-to-end
6. Add smooth transitions and animations

## Demo Scenarios

### Scenario 1: Employer Enablement
1. Admin logs in to dashboard
2. Views current crypto adoption (0%)
3. Enables crypto payouts for organization
4. Sets monthly limits and compliance requirements

### Scenario 2: Employee Onboarding
1. New employee completes profile setup
2. Sees crypto payout option during onboarding
3. Opts in and completes KYC verification
4. Wallet is created and shown as pending

### Scenario 3: Payroll Execution
1. Admin runs monthly payroll
2. System shows mix of traditional and crypto payouts
3. USDC payments are processed instantly
4. Employees receive wallet notifications

### Scenario 4: Employee Usage
1. Employee checks wallet balance
2. Views transaction history
3. Initiates cash-out to bank account
4. Converts USDC to local currency

## Mock Data Strategy

### Users
- 3 admin users (different roles)
- 15 employee users (various countries, opt-in status)
- Mix of verified/pending KYC statuses

### Transactions
- Historical payroll transactions (6 months)
- Various cash-out transactions
- Failed/pending transaction examples
- Different amounts and frequencies

### Organizations
- Primary demo organization with crypto enabled
- Comparison organization without crypto
- Different geographical restrictions

## Security Considerations

### For POC Demo
- All sensitive data is mocked (no real crypto addresses)
- No real financial transactions processed
- Mock KYC documents and verification
- Simulated compliance checks

### Production Considerations
- End-to-end encryption for sensitive data
- Multi-sig wallet integration
- Real-time AML monitoring
- Audit trail immutability
- Regulatory compliance frameworks

## Success Metrics for POC

### Demo Effectiveness
- Clear demonstration of all user flows
- Realistic data and scenarios
- Professional UI/UX presentation
- Performance and responsiveness

### Technical Implementation
- Clean, maintainable code structure
- Proper error handling and loading states
- Responsive design across devices
- Comprehensive mock data coverage

## Future Considerations

### Phase 2 Enhancements
- Real blockchain integration (Ethereum/Polygon)
- Third-party custody provider integration
- Advanced reporting and analytics
- Multi-currency support

### Scalability
- Database design for production scale
- Caching strategies for high throughput
- Background job processing for transactions
- Monitoring and observability setup

---

## File Structure
```
stablecoin-payouts-poc/
├── components/              # Reusable UI components
│   ├── ui/                 # Shadcn/UI base components
│   ├── admin/              # Admin dashboard components
│   ├── employee/           # Employee portal components
│   └── shared/             # Shared components
├── pages/                  # Next.js pages and routing
│   ├── admin/              # Admin dashboard pages
│   ├── employee/           # Employee portal pages
│   └── api/                # API routes (if needed for demos)
├── data/                   # Static mock data files
│   ├── users.json          # User accounts and profiles
│   ├── wallets.json        # Wallet balances and addresses
│   ├── transactions.json   # Transaction history
│   ├── organizations.json  # Company settings
│   └── payroll.json        # Payroll run data
├── lib/                    # Utility functions
│   ├── mockData.ts         # Mock data access functions
│   ├── utils.ts            # General utilities
│   └── auth.ts             # Mock authentication
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Authentication state
│   └── DataContext.tsx     # Mock data state
├── types/                  # TypeScript type definitions
│   └── index.ts            # All interface definitions
└── hooks/                  # Custom React hooks
    ├── useAuth.ts          # Authentication hook
    └── useData.ts          # Data access hook
```

This TDD provides a comprehensive roadmap for building a functional, demo-ready POC that showcases Deel's stablecoin payout capabilities while maintaining focus on rapid development and compelling user experience demonstration.