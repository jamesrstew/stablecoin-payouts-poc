'use client';

import { Wallet } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp } from 'lucide-react';

interface WalletBalanceProps {
  wallet: Wallet;
}

export default function WalletBalance({ wallet }: WalletBalanceProps) {
  const totalBalance = wallet.usdcBalance + wallet.usdBalance;
  const usdcPercentage = totalBalance > 0 ? (wallet.usdcBalance / totalBalance) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Total Balance */}
      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="text-3xl font-bold text-gray-900 mb-2">
          ${totalBalance.toLocaleString()}
        </div>
        <p className="text-gray-600">Total Balance</p>
      </div>

      {/* Balance Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">USDC</span>
            <Badge variant="default">Crypto</Badge>
          </div>
          <div className="text-xl font-bold text-blue-900">
            {wallet.usdcBalance.toLocaleString()}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            {usdcPercentage.toFixed(1)}% of total
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">USD</span>
            <Badge variant="outline">Fiat</Badge>
          </div>
          <div className="text-xl font-bold text-green-900">
            ${wallet.usdBalance.toLocaleString()}
          </div>
          <div className="text-xs text-green-600 mt-1">
            {(100 - usdcPercentage).toFixed(1)}% of total
          </div>
        </div>
      </div>

      {/* Balance Distribution */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Balance Distribution</span>
          <span className="text-gray-500">USDC vs USD</span>
        </div>
        <Progress value={usdcPercentage} className="h-2" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>USDC ({usdcPercentage.toFixed(1)}%)</span>
          <span>USD ({(100 - usdcPercentage).toFixed(1)}%)</span>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="p-3 bg-gray-50 rounded border text-center">
        <div className="text-xs text-gray-500 mb-1">Wallet Address</div>
        <div className="font-mono text-sm text-gray-700">
          {wallet.address}
        </div>
      </div>
    </div>
  );
}