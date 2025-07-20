// "use client";
// import { LoginForm } from "@/components/login-form";

// export default function LoginPage() {
//   return <LoginForm />;
// } 
"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store } from "lucide-react";
import { signInWithGoogle } from "@/lib/firebase-auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const result = await signInWithGoogle();
      const user = result.user;
      // You may want to send user info to your backend for JWT/session
      // For demo, redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Left Panel - Branding */}
      <div className="hidden bg-orange-100 dark:bg-gray-900 lg:flex flex-col items-center justify-center p-12 text-center">
        <div className="mb-6 bg-orange-500 p-5 rounded-full shadow-lg">
          <Store className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          CRM Heist
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          The central hub for your growing business.
        </p>
      </div>

      {/* Right Panel - Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-white dark:bg-gray-950">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Login to Your Account</h1>
            <p className="mt-2 text-muted-foreground">
              Enter your credentials to access your dashboard.
            </p>
          </div>
          {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            
            <Button variant="outline" className="w-full" type="button" onClick={handleGoogleLogin} disabled={loading}>
              {loading ? "Signing in..." : "Login with Google"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}