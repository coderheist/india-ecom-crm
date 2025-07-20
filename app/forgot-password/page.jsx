"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleForgot(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setSuccess("Password reset instructions sent to your email.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 p-4">
      <div className="w-full max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Forgot Password</h1>
        {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}
        {success && <div className="text-green-500 text-sm text-center mb-2">{success}</div>}
        <form className="space-y-4" onSubmit={handleForgot}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} disabled={loading} />
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        <div className="text-center text-sm mt-4">
          Remembered your password? <Link href="/login" className="underline">Login</Link>
        </div>
      </div>
    </div>
  );
}
