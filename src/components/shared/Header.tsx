'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, Settings, User, Wallet, Zap, Shield, Activity } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="glass border-b border-gray-700/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-2 glow-green">
              <Wallet className="w-full h-full text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Deel Protocol
              </h1>
              <div className="text-xs text-gray-400 -mt-1">Stablecoin Payroll Infrastructure</div>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 text-green-400 border border-green-500/30 px-3 py-1">
              <Activity className="w-3 h-3 mr-1 animate-pulse" />
              Live Demo
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-purple-400 border border-purple-500/30 px-3 py-1">
              <Shield className="w-3 h-3 mr-1" />
              Testnet
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50">
            <div className="flex items-center space-x-2">
              {user.role === 'admin' ? (
                <Shield className="w-4 h-4 text-blue-400" />
              ) : (
                <User className="w-4 h-4 text-green-400" />
              )}
              <span className="font-medium text-white">{user.name}</span>
            </div>
            
            <div className="h-4 w-px bg-gray-600"></div>
            
            <Badge 
              className={`text-xs px-2 py-1 border-0 ${
                user.role === 'admin' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
              }`}
            >
              {user.role === 'admin' ? 'Protocol Admin' : 'User'}
            </Badge>
            
            {user.cryptoOptIn && (
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 rounded-full"
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 border border-gray-700/50 hover:border-red-500/50 rounded-full transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="border-t border-gray-700/30 bg-gray-900/30 px-6 py-2">
        <div className="container mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Network: Ethereum Mainnet</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>USDC: $1.000</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Gas: 12 gwei</span>
            </div>
          </div>
          <div className="text-gray-500">
            Connected to {user.country} • {user.department}
          </div>
        </div>
      </div>
    </header>
  );
}