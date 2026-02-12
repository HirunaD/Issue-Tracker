import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from './useAuthStore';
import { toast } from 'react-toastify';
import { LogIn, Loader2, Bug, Mail, Lock } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success("Welcome back!");
      navigate('/dashboard');
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen auth-gradient flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Bug className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-xl hidden sm:block">Issue Tracker</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to continue tracking your issues</p>
          </div>

          {/* Login Card */}
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <LogIn className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Sign In</CardTitle>
                  <CardDescription>Enter your credentials below</CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-background/50"
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="password" 
                      placeholder="••••••••"
                      required 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11 bg-background/50"
                      disabled={loading}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pt-2">
                <Button type="submit" className="w-full h-11 text-base font-medium" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">New here?</span>
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-semibold text-primary hover:underline underline-offset-4">
                    Create account
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Issue Tracker. All rights reserved.
      </footer>
    </div>
  );
};