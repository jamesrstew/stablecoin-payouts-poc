'use client';

import { getUsersByOrganization } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface EmployeeListProps {
  orgId: string;
}

export default function EmployeeList({ orgId }: EmployeeListProps) {
  const employees = getUsersByOrganization(orgId).filter(u => u.role === 'employee');

  const getKycIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Crypto Status</TableHead>
            <TableHead>KYC Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-sm text-gray-500">{employee.department}</div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{employee.country}</Badge>
              </TableCell>
              <TableCell>
                {employee.cryptoOptIn ? (
                  <Badge variant="default">Enabled</Badge>
                ) : (
                  <Badge variant="secondary">Disabled</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  {getKycIcon(employee.kycStatus)}
                  <span className="text-sm capitalize">{employee.kycStatus}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}