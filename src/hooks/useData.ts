import { useMemo } from 'react';
import { 
  getUsersByOrganization, 
  getWalletByUserId, 
  getTransactionsByUserId,
  getCryptoAdoptionStats,
  getTotalCryptoPayouts,
  getMonthlyPayoutTrend,
  getPayrollRunsByOrganization
} from '@/lib/mockData';


export function useOrganizationData(orgId: string) {
  const data = useMemo(() => ({
    employees: getUsersByOrganization(orgId),
    adoptionStats: getCryptoAdoptionStats(orgId),
    totalPayouts: getTotalCryptoPayouts(orgId),
    monthlyTrend: getMonthlyPayoutTrend(orgId),
    payrollRuns: getPayrollRunsByOrganization(orgId)
  }), [orgId]);
  
  return data;
}

export function useUserWallet(userId: string) {
  const data = useMemo(() => ({
    wallet: getWalletByUserId(userId),
    transactions: getTransactionsByUserId(userId)
  }), [userId]);
  
  return data;
}