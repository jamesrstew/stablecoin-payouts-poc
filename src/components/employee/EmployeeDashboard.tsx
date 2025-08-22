'use client';

import { useAuth } from '@/hooks/useAuth';
import { useUserWallet } from '@/hooks/useData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Wallet, 
  TrendingUp, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Settings,
  Clock
} from 'lucide-react';
import WalletBalance from './WalletBalance';
import TransactionHistory from './TransactionHistory';
import CashOutOptions from './CashOutOptions';
import CryptoOptIn from './CryptoOptIn';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const { wallet, transactions } = useUserWallet(user?.id || '');

  const hasWallet = !!wallet;
  const recentTransactions = transactions.slice(0, 3);
  const totalReceived = transactions
    .filter(tx => tx.type === 'payroll' && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const quickStats = [
    {
      title: 'Current Balance',
      value: wallet ? `$${(wallet.usdcBalance + wallet.usdBalance).toLocaleString()}` : '$0',
      subtitle: wallet ? `${wallet.usdcBalance} USDC + $${wallet.usdBalance}` : 'No wallet',
      icon: Wallet,
      color: 'text-blue-600'
    },
    {
      title: 'Total Received',
      value: `$${totalReceived.toLocaleString()}`,
      subtitle: 'All-time crypto payouts',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Last Payout',
      value: recentTransactions[0] ? `$${recentTransactions[0].amount.toLocaleString()}` : 'None',
      subtitle: recentTransactions[0] ? new Date(recentTransactions[0].timestamp).toLocaleDateString() : 'No payouts yet',
      icon: ArrowDownToLine,
      color: 'text-purple-600'
    }
  ];

  if (!user?.cryptoOptIn) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Get Paid in Crypto</h1>
          <p className="text-gray-600 mt-1">Enable stablecoin payouts for faster, cheaper payments</p>
        </div>
        <CryptoOptIn />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Crypto Wallet</h1>
          <p className="text-gray-600 mt-1">Manage your USDC balance and transactions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KYC Status Alert */}
      {user.kycStatus === 'pending' && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div className="flex-1">
                <h4 className="font-medium text-yellow-800">Verification Pending</h4>
                <p className="text-sm text-yellow-700">
                  Your identity verification is being processed. Payouts will be available once verified.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Check Status
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Wallet and Transactions */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="h-5 w-5 mr-2" />
                Wallet Balance
              </CardTitle>
              <CardDescription>
                Your current USDC and USD balances
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasWallet ? (
                <WalletBalance wallet={wallet} />
              ) : (
                <div className="text-center py-8">
                  <Wallet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Wallet will be created with your first payout</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Your recent crypto payouts and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionHistory transactions={transactions} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          {hasWallet && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowUpFromLine className="h-5 w-5 mr-2" />
                  Cash Out
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CashOutOptions wallet={wallet} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">KYC Status</span>
                <Badge variant={user.kycStatus === 'verified' ? 'default' : 'secondary'}>
                  {user.kycStatus}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Country</span>
                <Badge variant="outline">{user.country}</Badge>
              </div>
              
              {hasWallet && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Wallet Status</span>
                  <Badge variant={wallet.status === 'active' ? 'default' : 'secondary'}>
                    {wallet.status}
                  </Badge>
                </div>
              )}
              
              <div className="pt-2 border-t">
                <div className="text-xs text-gray-500 space-y-1">
                  {hasWallet && (
                    <div>Wallet: {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</div>
                  )}
                  <div>Department: {user.department}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}