'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  DollarSign, 
  Shield, 
  Globe,
  CheckCircle,
  ArrowRight,
  Clock
} from 'lucide-react';

export default function CryptoOptIn() {
  const { user } = useAuth();
  const [isEnabling, setIsEnabling] = useState(false);

  const benefits = [
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Receive your salary immediately when payroll runs',
      color: 'text-yellow-500'
    },
    {
      icon: DollarSign,
      title: 'Lower Fees',
      description: 'Save on international transfer fees and currency conversion',
      color: 'text-green-500'
    },
    {
      icon: Shield,
      title: 'Stable Value',
      description: 'USDC is pegged 1:1 to USD, protecting against volatility',
      color: 'text-blue-500'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your funds anywhere with internet connection',
      color: 'text-purple-500'
    }
  ];

  const handleOptIn = async () => {
    setIsEnabling(true);
    // Simulate enabling process
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In real app, this would update user preferences
    window.location.reload(); // Refresh to show updated state
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Get Paid in Crypto
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join the future of payroll with instant USDC payments. Faster, cheaper, and more flexible than traditional banking.
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Badge variant="secondary">Available in {user?.country}</Badge>
            <Badge variant="outline">USDC Stablecoin</Badge>
          </div>
          
          <Button 
            size="lg" 
            onClick={handleOptIn}
            disabled={isEnabling}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isEnabling ? (
              <>
                <Clock className="h-5 w-5 mr-2 animate-spin" />
                Enabling...
              </>
            ) : (
              <>
                Enable Crypto Payouts
                <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                <span>{benefit.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Simple steps to start receiving crypto payouts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2">Enable Crypto Payouts</h4>
              <p className="text-sm text-gray-600">
                Click the button above to opt into crypto payments
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2">Complete Verification</h4>
              <p className="text-sm text-gray-600">
                Verify your identity for compliance and security
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-medium mb-2">Receive USDC</h4>
              <p className="text-sm text-gray-600">
                Get your salary in USDC on your next payroll run
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">What is USDC?</h4>
              <p className="text-sm text-gray-600">
                USDC is a stablecoin backed 1:1 by US dollars, providing the stability of USD with the benefits of cryptocurrency.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Can I convert back to regular USD?</h4>
              <p className="text-sm text-gray-600">
                Yes, you can cash out to your bank account or debit card anytime through your wallet dashboard.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Are there any fees?</h4>
              <p className="text-sm text-gray-600">
                Bank transfers are free, while instant debit card cash-outs have a small 1.5% fee.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-1">Is my money safe?</h4>
              <p className="text-sm text-gray-600">
                Yes, your funds are held in regulated, audited wallets with enterprise-grade security measures.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}