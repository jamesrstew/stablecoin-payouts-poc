'use client';

import { useState } from 'react';
import { getOrganizationById } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CheckCircle, Settings } from 'lucide-react';

interface CryptoSettingsProps {
  orgId: string;
}

export default function CryptoSettings({ orgId }: CryptoSettingsProps) {
  const organization = getOrganizationById(orgId);
  const [enabled, setEnabled] = useState(organization?.cryptoEnabled || false);
  const [monthlyLimit, setMonthlyLimit] = useState(organization?.settings.maxMonthlyLimit || 10000);
  const [kycRequired, setKycRequired] = useState<boolean>(organization?.settings.kycRequired || true);

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', { enabled, monthlyLimit, kycRequired });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor="crypto-enabled">Enable Crypto Payouts</Label>
          {enabled && <CheckCircle className="h-4 w-4 text-green-500" />}
        </div>
        <Switch
          id="crypto-enabled"
          checked={enabled}
          onCheckedChange={(checked: boolean) => setEnabled(checked)}
        />
      </div>

      {enabled && (
        <div className="space-y-4 pt-4 border-t">
          <div>
            <Label htmlFor="monthly-limit">Monthly Limit (USD)</Label>
            <Input
              id="monthly-limit"
              type="number"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(Number(e.target.value))}
              className="mt-1"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="kyc-required">Require KYC Verification</Label>
            <Switch
              id="kyc-required"
              checked={kycRequired}
              onCheckedChange={(checked: boolean) => setKycRequired(checked)}
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Allowed Countries</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {organization?.settings.allowedCountries.map((country) => (
                <Badge key={country} variant="outline">{country}</Badge>
              ))}
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            Save Settings
          </Button>
        </div>
      )}
    </div>
  );
}