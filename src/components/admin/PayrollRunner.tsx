'use client';

import { useState } from 'react';
import { getPayrollRunsByOrganization, getCryptoEnabledEmployees } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Clock, CheckCircle, DollarSign, Users } from 'lucide-react';

interface PayrollRunnerProps {
  orgId: string;
}

export default function PayrollRunner({ orgId }: PayrollRunnerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const payrollRuns = getPayrollRunsByOrganization(orgId);
  const cryptoEmployees = getCryptoEnabledEmployees(orgId);

  const handleRunPayroll = async () => {
    setIsRunning(true);
    // Simulate payroll processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">September 2024 Payroll</h4>
            <Badge variant="outline">Ready</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-gray-500" />
              <span>{cryptoEmployees.length} crypto employees</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
              <span>~$16.5k USDC</span>
            </div>
          </div>

          <Button 
            onClick={handleRunPayroll} 
            disabled={isRunning}
            className="w-full"
          >
            {isRunning ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Payroll
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h4 className="font-medium text-sm text-gray-600">Recent Payroll Runs</h4>
        {payrollRuns.slice(0, 3).map((run) => (
          <div key={run.id} className="flex items-center justify-between p-3 bg-white border rounded">
            <div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(run.status)}
                <span className="font-medium">{run.period}</span>
                <Badge variant={run.status === 'completed' ? 'default' : 'secondary'}>
                  {run.status}
                </Badge>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                ${run.cryptoAmount.toLocaleString()} USDC • {run.cryptoEmployeeCount} employees
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}