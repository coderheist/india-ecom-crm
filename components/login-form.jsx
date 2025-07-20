"use client"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Store } from "lucide-react"

export function LoginForm() {
  const { loginWithGoogle, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500 p-3 rounded-full">
              <Store className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">CRM Heist</CardTitle>
          <CardDescription>Sign in to access your CRM dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={loginWithGoogle}
            disabled={isLoading}
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
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in with Google"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
