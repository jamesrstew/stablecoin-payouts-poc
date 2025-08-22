# 🚀 Deel Protocol - Stablecoin Payouts POC

A next-generation DeFi-style demonstration of Deel's "Get Paid in Crypto" feature, enabling seamless USDC payroll distributions through a professional protocol interface.

![Deel Protocol](https://img.shields.io/badge/Deel-Protocol-00d4aa?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🔐 **Protocol Admin Dashboard**
- **Liquidity Analytics** - Real-time USDC distribution metrics and volume trends
- **Protocol Participants** - Manage users connected to the stablecoin infrastructure  
- **Transaction Execution** - Execute payroll runs with instant USDC settlements
- **Security Controls** - Configure distribution parameters and compliance settings
- **Network Status** - Live blockchain data including gas prices and TVL

### 💰 **Employee Wallet Interface**
- **Hosted Wallet** - Professional wallet management with USDC/USD balance display
- **Transaction History** - Complete audit trail of payroll distributions and cash-outs
- **Instant Cash-Out** - Convert USDC to fiat via bank transfer or debit card
- **KYC Integration** - Seamless identity verification workflow
- **Global Access** - Support for employees in emerging markets

### 🎨 **DeFi-Style Design**
- **Glass Morphism** - Modern glassmorphic cards with crypto-inspired borders
- **Gradient Effects** - Animated gradients and neon glow effects throughout
- **Dark Theme** - Professional dark interface with blue/green/purple accents
- **Floating Animations** - Subtle animations and hover effects for premium UX
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🏗️ Architecture

**Frontend Stack:**
- **Next.js 15** with App Router and static export for GitHub Pages
- **TypeScript** for type safety and better developer experience  
- **Tailwind CSS v4** with custom design system and animations
- **Shadcn/UI** components with crypto-themed customizations
- **Recharts** for interactive analytics and trend visualization

**Data Layer:**
- **Static JSON** mock data for demonstration purposes
- **React Context** for state management with local storage persistence
- **TypeScript interfaces** for all data models and API contracts

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Development

```bash
# Clone the repository
git clone https://github.com/jamesrstew/stablecoin-payouts-poc.git
cd stablecoin-payouts-poc

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the Deel Protocol interface.

### Demo Users

**Protocol Admin:**
- **Sarah Chen** - `sarah.chen@techcorp.com` - HR Admin with full protocol access

**Protocol Users (Employees):**
- **Carlos Martinez** - Argentina - Crypto enabled, verified KYC
- **Priya Patel** - India - Crypto enabled, active wallet  
- **James Wilson** - Nigeria - Pending KYC verification
- **Alex Kim** - South Korea - High-volume crypto user
- **Fatima Hassan** - Egypt - Recent crypto adopter

## 📊 Demo Scenarios

### 1. **Admin Protocol Management**
- Login as Sarah Chen to access the protocol dashboard
- View adoption metrics showing 62% employee crypto enrollment
- Execute September 2024 payroll with $16.5k USDC distribution
- Monitor network status and adjust security parameters

### 2. **Employee Onboarding**
- Login as James Wilson to experience the crypto opt-in flow
- Complete KYC verification with document upload simulation
- Receive first USDC payout and explore wallet features

### 3. **Active User Experience** 
- Login as Carlos Martinez to see established crypto user flows
- Review transaction history with multiple payroll distributions
- Initiate cash-out to bank account or instant debit card transfer
- Convert USDC to USD within the hosted wallet

## 🛠️ Build & Deploy

```bash
# Build for production
npm run build

# The static export will be generated in ./out directory
# Ready for GitHub Pages or any static hosting service
```

## 📱 Live Demo

**🌐 [View Live Demo](https://jamesrstew.github.io/stablecoin-payouts-poc/)**

Experience the full Deel Protocol interface with realistic data, smooth animations, and professional DeFi styling.

## 🏢 Business Impact

This POC demonstrates how Deel can:

- **Reduce Payout Costs** - Eliminate international wire fees and FX spreads
- **Increase Speed** - Instant payroll settlement vs 3-5 day traditional banking  
- **Expand Access** - Serve employees in regions with limited banking infrastructure
- **Attract Talent** - Appeal to crypto-native workforce with modern payout options
- **Maintain Compliance** - Full KYC/AML integration with audit trails

## 🔧 Technical Implementation

### Key Components

- **Authentication System** - Mock user login with role-based access control
- **Dashboard Analytics** - Interactive charts showing adoption and volume trends  
- **Wallet Management** - Balance display, transaction history, and cash-out flows
- **Settings Configuration** - Admin controls for enabling crypto payouts
- **KYC Workflow** - Identity verification process with status tracking

### Data Models

```typescript
interface User {
  id: string;
  email: string;  
  name: string;
  role: 'employee' | 'admin';
  kycStatus: 'pending' | 'verified' | 'rejected';
  cryptoOptIn: boolean;
  country: string;
}

interface Wallet {
  userId: string;
  usdcBalance: number;
  usdBalance: number; 
  address: string;
  status: 'active' | 'frozen' | 'pending';
}

interface Transaction {
  type: 'payroll' | 'cashout' | 'conversion';
  amount: number;
  currency: 'USDC' | 'USD';
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}
```

## 🎯 Future Enhancements

- **Multi-chain Support** - Expand beyond Ethereum to Polygon, Arbitrum, Base
- **DeFi Integrations** - Yield farming options for idle USDC balances
- **Advanced Analytics** - Detailed cost savings and adoption metrics
- **Mobile App** - Native iOS/Android wallet applications
- **Enterprise APIs** - Integration with existing HRIS and payroll systems

## 🤝 Contributing

This is a demonstration project showcasing Deel's potential crypto payout capabilities. For production implementation inquiries, please contact the Deel team.

## 📄 License

MIT License - Built for demonstration purposes as part of Alchemy's final round assessment.

---

**Built with ❤️ by Claude Code** - Demonstrating the future of global payroll infrastructure.