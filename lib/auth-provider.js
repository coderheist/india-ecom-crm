"use client"

import { createContext, useContext, useState, useEffect } from "react"
import app from "@/lib/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("crm_user")

      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          // All users are admin
          userData.role = "admin"
          localStorage.setItem("crm_user", JSON.stringify(userData))
          setUser(userData)
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("crm_user")
        }
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("crm_user")
    }
    router.push("/")
  }

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userInfo = {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
        provider: "google",
        role: "admin", // All users are admin
      };
      setUser(userInfo);
      if (typeof window !== "undefined") {
        localStorage.setItem("crm_user", JSON.stringify(userInfo));
      }
      // Redirect directly to dashboard after successful login
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      console.error("Google login error:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return <AuthContext.Provider value={{ user, loginWithGoogle, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
