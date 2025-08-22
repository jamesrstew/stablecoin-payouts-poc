export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'admin';
  organizationId: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  cryptoOptIn: boolean;
  createdAt: string;
  country: string;
  department: string;
}

export interface Wallet {
  id: string;
  userId: string;
  usdcBalance: number;
  usdBalance: number;
  address: string;
  status: 'active' | 'frozen' | 'pending';
}

export interface Transaction {
  id: string;
  walletId: string;
  userId: string;
  type: 'payroll' | 'cashout' | 'conversion';
  amount: number;
  currency: 'USDC' | 'USD';
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  description: string;
  metadata?: any;
}

export interface Organization {
  id: string;
  name: string;
  cryptoEnabled: boolean;
  settings: {
    allowedCountries: string[];
    maxMonthlyLimit: number;
    kycRequired: boolean;
  };
}

export interface PayrollRun {
  id: string;
  organizationId: string;
  period: string;
  status: 'draft' | 'processing' | 'completed';
  totalAmount: number;
  cryptoAmount: number;
  employeeCount: number;
  cryptoEmployeeCount: number;
  createdAt: string;
  completedAt?: string;
}