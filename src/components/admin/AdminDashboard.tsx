'use client';

import { useAuth } from '@/hooks/useAuth';
import { useOrganizationData } from '@/hooks/useData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Settings,
  Play,
  BarChart3,
  FileText,
  Wallet,
  Zap,
  Activity,
  Globe,
  Lock,
  Sparkles
} from 'lucide-react';
import CryptoSettings from './CryptoSettings';
import PayoutChart from './PayoutChart';
import EmployeeList from './EmployeeList';
import PayrollRunner from './PayrollRunner';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { adoptionStats, totalPayouts, monthlyTrend, payrollRuns } = useOrganizationData(user?.organizationId || '');

  const statCards = [
    {
      title: 'Protocol Adoption',
      value: `${adoptionStats.adoptionRate}%`,
      description: `${adoptionStats.cryptoEmployees} of ${adoptionStats.totalEmployees} users onboarded`,
      icon: Users,
      trend: '+12% from last month',
      color: 'from-blue-500 to-purple-600',
      glowColor: 'glow-blue'
    },
    {
      title: 'Total USDC Deployed',
      value: `$${totalPayouts.toLocaleString()}`,
      description: 'All-time stablecoin distributions',
      icon: DollarSign,
      trend: '+23% from last month',
      color: 'from-green-500 to-emerald-600',
      glowColor: 'glow-green'
    },
    {
      title: 'Protocol Growth',
      value: '+18%',
      description: 'Monthly volume increase',
      icon: TrendingUp,
      trend: 'Trending upward',
      color: 'from-purple-500 to-pink-600',
      glowColor: 'glow-purple'
    },
    {
      title: 'Security Score',
      value: '100%',
      description: `${adoptionStats.verifiedEmployees} users KYC verified`,
      icon: Shield,
      trend: 'All users secured',
      color: 'from-orange-500 to-red-600',
      glowColor: 'glow-green'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 p-2.5 glow-green float">
              <Activity className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent neon-text">
                Protocol Dashboard
              </h1>
              <p className="text-gray-400 text-lg mt-1">Manage your decentralized payroll infrastructure</p>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 glow-purple">
            <FileText className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-0 glow-blue">
            <Settings className="h-4 w-4 mr-2" />
            Protocol Config
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className={`glass crypto-border hover-lift ${stat.glowColor} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-3xl font-bold text-white neon-text">
                {stat.value}
              </div>
              <p className="text-sm text-gray-400">
                {stat.description}
              </p>
              <div className="flex items-center">
                <Badge className={`bg-gradient-to-r ${stat.color} text-white border-0 text-xs px-2 py-1`}>
                  <Sparkles className="w-3 h-3 mr-1" />
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Analytics */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="glass crypto-border glow-blue hover-lift">
            <CardHeader className="border-b border-gray-700/50">
              <CardTitle className="flex items-center text-white">
                <BarChart3 className="h-6 w-6 mr-3 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Liquidity Analytics
                </span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                USDC distribution trends and volume metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <PayoutChart data={monthlyTrend} />
            </CardContent>
          </Card>

          <Card className="glass crypto-border glow-green hover-lift">
            <CardHeader className="border-b border-gray-700/50">
              <CardTitle className="flex items-center text-white">
                <Globe className="h-6 w-6 mr-3 text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Protocol Participants
                </span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Users connected to the stablecoin protocol
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <EmployeeList orgId={user?.organizationId || ''} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Controls */}
        <div className="space-y-6">
          <Card className="glass crypto-border glow-purple hover-lift">
            <CardHeader className="border-b border-gray-700/50">
              <CardTitle className="flex items-center text-white">
                <Play className="h-6 w-6 mr-3 text-purple-400" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  Execute Transactions
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <PayrollRunner orgId={user?.organizationId || ''} />
            </CardContent>
          </Card>

          <Card className="glass crypto-border glow-green hover-lift">
            <CardHeader className="border-b border-gray-700/50">
              <CardTitle className="flex items-center text-white">
                <Lock className="h-6 w-6 mr-3 text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Protocol Security
                </span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure stablecoin distribution parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CryptoSettings orgId={user?.organizationId || ''} />
            </CardContent>
          </Card>

          {/* Network Stats */}
          <Card className="glass crypto-border glow-blue hover-lift">
            <CardHeader className="border-b border-gray-700/50">
              <CardTitle className="flex items-center text-white">
                <Zap className="h-6 w-6 mr-3 text-yellow-400" />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Network Status
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Chain</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Ethereum</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Gas Price</span>
                <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 text-yellow-400 border border-yellow-500/30">
                  12 gwei
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">USDC Price</span>
                <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 border border-green-500/30">
                  $1.000
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Protocol TVL</span>
                <span className="text-white font-medium">${(totalPayouts * 2.3).toLocaleString()}</span>
              </div>
              
              <div className="pt-3 border-t border-gray-700/50">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border-0 pulse-glow">
                  <Wallet className="h-4 w-4 mr-2" />
                  View on Explorer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}