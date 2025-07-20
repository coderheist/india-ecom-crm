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
            
            <Button variant="outline" className="w-full flex items-center justify-center" type="button" onClick={handleGoogleLogin} disabled={loading}>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48">
                <g>
                  <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.45 2.54 30.6 0 24 0 14.82 0 6.73 5.8 2.69 14.09l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.93 37.36 46.1 31.45 46.1 24.55z"/>
                  <path fill="#FBBC05" d="M10.67 28.29c-1.13-3.37-1.13-6.99 0-10.36l-7.98-6.2C.64 16.09 0 19.95 0 24c0 4.05.64 7.91 2.69 12.27l7.98-6.2z"/>
                  <path fill="#EA4335" d="M24 48c6.6 0 12.15-2.17 16.19-5.91l-7.19-5.59c-2.01 1.35-4.59 2.15-9 2.15-6.38 0-11.87-3.63-13.33-8.59l-7.98 6.2C6.73 42.2 14.82 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </g>
              </svg>
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