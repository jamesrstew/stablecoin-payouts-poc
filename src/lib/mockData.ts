import { User, Wallet, Transaction, Organization, PayrollRun } from '@/types';
import usersData from '@/data/users.json';
import walletsData from '@/data/wallets.json';
import transactionsData from '@/data/transactions.json';
import organizationsData from '@/data/organizations.json';
import payrollData from '@/data/payroll.json';

export const users: User[] = usersData as User[];
export const wallets: Wallet[] = walletsData as Wallet[];
export const transactions: Transaction[] = transactionsData as Transaction[];
export const organizations: Organization[] = organizationsData as Organization[];
export const payrollRuns: PayrollRun[] = payrollData as PayrollRun[];

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUsersByOrganization = (orgId: string): User[] => {
  return users.filter(user => user.organizationId === orgId);
};

export const getWalletByUserId = (userId: string): Wallet | undefined => {
  return wallets.find(wallet => wallet.userId === userId);
};

export const getTransactionsByUserId = (userId: string): Transaction[] => {
  return transactions.filter(transaction => transaction.userId === userId);
};

export const getTransactionsByWalletId = (walletId: string): Transaction[] => {
  return transactions.filter(transaction => transaction.walletId === walletId);
};

export const getOrganizationById = (id: string): Organization | undefined => {
  return organizations.find(org => org.id === id);
};

export const getPayrollRunsByOrganization = (orgId: string): PayrollRun[] => {
  return payrollRuns.filter(run => run.organizationId === orgId);
};

export const getCryptoEnabledEmployees = (orgId: string): User[] => {
  return users.filter(user => 
    user.organizationId === orgId && 
    user.role === 'employee' && 
    user.cryptoOptIn
  );
};

export const getCryptoAdoptionStats = (orgId: string) => {
  const employees = getUsersByOrganization(orgId).filter(u => u.role === 'employee');
  const cryptoEmployees = getCryptoEnabledEmployees(orgId);
  
  return {
    totalEmployees: employees.length,
    cryptoEmployees: cryptoEmployees.length,
    adoptionRate: Math.round((cryptoEmployees.length / employees.length) * 100),
    verifiedEmployees: cryptoEmployees.filter(u => u.kycStatus === 'verified').length,
    pendingEmployees: cryptoEmployees.filter(u => u.kycStatus === 'pending').length
  };
};

export const getTotalCryptoPayouts = (orgId: string): number => {
  const cryptoTransactions = transactions.filter(tx => 
    tx.type === 'payroll' && 
    tx.currency === 'USDC' && 
    tx.status === 'completed'
  );
  
  return cryptoTransactions.reduce((sum, tx) => sum + tx.amount, 0);
};

export const getMonthlyPayoutTrend = (orgId: string, months = 6) => {
  const payrollTxs = transactions.filter(tx => 
    tx.type === 'payroll' && 
    tx.currency === 'USDC' && 
    tx.status === 'completed'
  );

  const monthlyData = [];
  const currentDate = new Date();
  
  for (let i = months - 1; i >= 0; i--) {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthStr = targetDate.toISOString().slice(0, 7);
    
    const monthTxs = payrollTxs.filter(tx => tx.timestamp.startsWith(monthStr));
    const amount = monthTxs.reduce((sum, tx) => sum + tx.amount, 0);
    
    monthlyData.push({
      month: targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      amount,
      count: monthTxs.length
    });
  }
  
  return monthlyData;
};