'use client';

import { Transaction } from '@/types';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payroll':
        return <ArrowDownToLine className="h-4 w-4 text-green-500" />;
      case 'cashout':
        return <ArrowUpFromLine className="h-4 w-4 text-blue-500" />;
      case 'conversion':
        return <RefreshCw className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    const configs = {
      payroll: { variant: 'default' as const, label: 'Payroll' },
      cashout: { variant: 'secondary' as const, label: 'Cash Out' },
      conversion: { variant: 'outline' as const, label: 'Convert' }
    };
    
    const config = configs[type as keyof typeof configs] || { variant: 'outline' as const, label: type };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <ArrowDownToLine className="h-12 w-12 mx-auto" />
        </div>
        <p className="text-gray-500">No transactions yet</p>
        <p className="text-sm text-gray-400">Your payouts will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getTypeIcon(transaction.type)}
                  {getTypeBadge(transaction.type)}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <div className="font-medium text-sm">{transaction.description}</div>
                  {(() => {
                    const period = transaction.metadata?.period;
                    return period && typeof period === 'string' ? (
                      <div className="text-xs text-gray-500">Period: {period}</div>
                    ) : null;
                  })()}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {transaction.type === 'cashout' ? '-' : '+'}
                  {transaction.amount.toLocaleString()} {transaction.currency}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(transaction.status)}
                  <span className="text-sm capitalize">{transaction.status}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(transaction.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}