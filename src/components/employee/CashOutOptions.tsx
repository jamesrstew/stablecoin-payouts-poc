'use client';

import { useState } from 'react';
import { Wallet } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  CreditCard, 
  ArrowUpFromLine,
  RefreshCw
} from 'lucide-react';

interface CashOutOptionsProps {
  wallet: Wallet;
}

export default function CashOutOptions({ wallet }: CashOutOptionsProps) {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'card' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCashOut = async () => {
    if (!amount || !selectedMethod) return;
    
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setAmount('');
    setSelectedMethod(null);
  };

  const maxAmount = wallet.usdcBalance;

  return (
    <div className="space-y-4">
      {/* Balance Display */}
      <div className="text-center p-3 bg-blue-50 rounded">
        <div className="text-sm text-blue-600 mb-1">Available to Cash Out</div>
        <div className="text-xl font-bold text-blue-900">
          {wallet.usdcBalance.toLocaleString()} USDC
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            max={maxAmount}
            step="0.01"
          />
          <div className="absolute right-3 top-2.5 text-sm text-gray-500">USDC</div>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Min: 10 USDC</span>
          <button 
            onClick={() => setAmount(maxAmount.toString())}
            className="text-blue-600 hover:underline"
          >
            Use Max
          </button>
        </div>
      </div>

      {/* Cash Out Methods */}
      <div className="space-y-2">
        <Label>Cash Out Method</Label>
        
        <Card 
          className={`cursor-pointer transition-all ${
            selectedMethod === 'bank' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMethod('bank')}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium">Bank Transfer</div>
                  <div className="text-sm text-gray-500">1-3 business days</div>
                </div>
              </div>
              <Badge variant="secondary">Free</Badge>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${
            selectedMethod === 'card' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => setSelectedMethod('card')}
        >
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium">Debit Card</div>
                  <div className="text-sm text-gray-500">Instant</div>
                </div>
              </div>
              <Badge variant="outline">1.5% fee</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Convert Option */}
      <div className="border-t pt-4">
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="font-medium text-purple-900">Convert to USD</div>
                  <div className="text-sm text-purple-700">Keep in wallet as USD</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Convert
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <Button 
        onClick={handleCashOut}
        disabled={!amount || !selectedMethod || isProcessing || Number(amount) < 10}
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ArrowUpFromLine className="h-4 w-4 mr-2" />
            Cash Out {amount && `$${amount}`}
          </>
        )}
      </Button>

      {selectedMethod && amount && Number(amount) >= 10 && (
        <div className="text-xs text-gray-500 text-center">
          You&apos;ll receive approximately ${(Number(amount) * (selectedMethod === 'card' ? 0.985 : 1)).toFixed(2)} USD
        </div>
      )}
    </div>
  );
}