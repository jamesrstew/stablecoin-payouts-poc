import { useState, useMemo } from 'react';
import { 
  getUsersByOrganization, 
  getWalletByUserId, 
  getTransactionsByUserId,
  getCryptoAdoptionStats,
  getTotalCryptoPayouts,
  getMonthlyPayoutTrend,
  getPayrollRunsByOrganization
} from '@/lib/mockData';
import { User, Wallet, Transaction, PayrollRun } from '@/types';

export function useOrganizationData(orgId: string) {
  const [isLoading, setIsLoading] = useState(false);
  
  const data = useMemo(() => ({
    employees: getUsersByOrganization(orgId),
    adoptionStats: getCryptoAdoptionStats(orgId),
    totalPayouts: getTotalCryptoPayouts(orgId),
    monthlyTrend: getMonthlyPayoutTrend(orgId),
    payrollRuns: getPayrollRunsByOrganization(orgId)
  }), [orgId]);
  
  return { ...data, isLoading };
}

export function useUserWallet(userId: string) {
  const [isLoading, setIsLoading] = useState(false);
  
  const data = useMemo(() => ({
    wallet: getWalletByUserId(userId),
    transactions: getTransactionsByUserId(userId)
  }), [userId]);
  
  return { ...data, isLoading };
}