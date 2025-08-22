'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { users } from '@/lib/mockData';
import { Wallet, Zap, Shield, Sparkles } from 'lucide-react';

export function LoginScreen() {
  const { login } = useAuth();
  const [selectedUser, setSelectedUser] = useState<string>('');

  const adminUsers = users.filter(u => u.role === 'admin');
  const employeeUsers = users.filter(u => u.role === 'employee');

  const handleLogin = () => {
    if (selectedUser) {
      login(selectedUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      <Card className="w-full max-w-2xl relative glass glow-green hover-lift z-10">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-3 glow-green float">
                <Wallet className="w-full h-full text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent neon-text mb-3">
            Deel Protocol
          </CardTitle>
          <CardDescription className="text-xl text-gray-300 mb-4">
            Next-Gen Stablecoin Payroll Infrastructure
          </CardDescription>
          <div className="flex items-center justify-center space-x-2">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-1">
              <Zap className="w-4 h-4 mr-2" />
              Live Demo
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 px-4 py-1">
              <Shield className="w-4 h-4 mr-2" />
              Testnet
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8 pb-8">
          {/* Admin Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Protocol Admin
              </h3>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                Admin Access
              </Badge>
            </div>
            <div className="space-y-3">
              {adminUsers.map(user => (
                <div 
                  key={user.id}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedUser === user.id 
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 glow-blue crypto-border' 
                      : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-blue-500/50'
                  }`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="font-medium text-white flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-blue-400" />
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.department}</div>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                      Admin
                    </Badge>
                  </div>
                  {selectedUser === user.id && (
                    <div className="absolute inset-0 rounded-xl animate-pulse bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Employee Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Protocol Users
              </h3>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                Employee Access
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
              {employeeUsers.map(user => (
                <div 
                  key={user.id}
                  className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedUser === user.id 
                      ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 glow-green crypto-border' 
                      : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-green-500/50'
                  }`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1 flex-1">
                      <div className="font-medium text-white flex items-center text-sm">
                        <Wallet className="w-4 h-4 mr-2 text-green-400" />
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-400 truncate">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-600">
                        {user.country}
                      </Badge>
                      {user.cryptoOptIn && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 text-xs px-2 py-0.5">
                          <Zap className="w-3 h-3 mr-1" />
                          Crypto
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{user.department}</div>
                  </div>
                  {selectedUser === user.id && (
                    <div className="absolute inset-0 rounded-xl animate-pulse bg-gradient-to-r from-green-500/10 to-emerald-500/10"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connect Button */}
          <div className="pt-4">
            <Button 
              onClick={handleLogin} 
              disabled={!selectedUser}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-400 hover:via-blue-400 hover:to-purple-500 border-0 transition-all duration-300 glow-green animate-gradient disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {!selectedUser ? (
                <>
                  <Wallet className="w-6 h-6 mr-3" />
                  Select User to Connect
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 mr-3" />
                  Connect to Protocol
                </>
              )}
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <div>🔒 Secure • ⚡ Instant • 🌍 Global</div>
            <div className="text-gray-600">Powered by USDC on Ethereum</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}