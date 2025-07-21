"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginWithGoogle } = useAuth();

  // Email/Password login handler
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Store token and user object
      localStorage.setItem("token", data.token);
      localStorage.setItem("crm_user", JSON.stringify(data.user));
      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Google Sign-In handler
  async function handleGoogleLogin() {
    setLoading(true);
    setError("");
    try {
      const result = await loginWithGoogle();
      if (!result.success) throw new Error(result.error || "Google sign-in failed");
      // AuthProvider handles redirect and localStorage
    } catch (err) {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
              <Store className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">CRM Heist</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">← Back to Home</Button>
          </Link>
        </div>

        {/* Login Form */}
        <div className="max-w-md mx-auto">
          <Card className="card-enhanced shadow-xl border-0">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg w-fit">
                <Store className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription className="text-base">
                  Sign in to access your CRM dashboard
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="form-group">
                  <Label htmlFor="email" className="form-label">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={loading}
                      className="pl-10 input-enhanced"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="form-label">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={loading}
                      className="pl-10 input-enhanced"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                type="button" 
                onClick={handleGoogleLogin} 
                disabled={loading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48">
                  <g>
                    <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.45 2.54 30.6 0 24 0 14.82 0 6.73 5.8 2.69 14.09l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/>
                    <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.93 37.36 46.1 31.45 46.1 24.55z"/>
                    <path fill="#FBBC05" d="M10.67 28.29c-1.13-3.37-1.13-6.99 0-10.36l-7.98-6.2C.64 16.09 0 19.95 0 24c0 4.05.64 7.91 2.69 12.27l7.98-6.2z"/>
                    <path fill="#EA4335" d="M24 48c6.6 0 12.15-2.17 16.19-5.91l-7.19-5.59c-2.01 1.35-4.59 2.15-9 2.15-6.38 0-11.87-3.63-13.33-8.59l-7.98 6.2C6.73 42.2 14.82 48 24 48z"/>
                    <path fill="none" d="M0 0h48v48H0z"/>
                  </g>
                </svg>
                {loading ? "Signing in..." : "Continue with Google"}
              </Button>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}