"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import app from "@/lib/firebase"

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("crm_user")
      const currentPath = window.location.pathname
      
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          // Ensure user has admin role
          userData.role = "admin"
          setUser(userData)
          localStorage.setItem("crm_user", JSON.stringify(userData))
          
          // Redirect to dashboard if on login or root page
          if (currentPath === "/" || currentPath === "/login") {
            window.location.href = "/dashboard"
          }
        } catch (error) {
          console.error("Error parsing saved user:", error)
          localStorage.removeItem("crm_user")
        }
      } else if (currentPath === "/dashboard") {
        // Redirect to login if no user and trying to access dashboard
        window.location.href = "/login"
      }
    }
    setIsLoading(false)
  }, [])

  // Login with email and password
  const loginWithCredentials = async (email, password) => {
    setIsLoading(true)
    try {
      const auth = getAuth(app)
      const result = await signInWithEmailAndPassword(auth, email, password)
      
      const userInfo = {
        email: result.user.email,
        name: result.user.displayName || email.split("@")[0],
        photoURL: result.user.photoURL || "/placeholder-user.jpg",
        uid: result.user.uid,
        provider: "password",
        role: "admin"
      }

      // Update local storage first
      localStorage.setItem("crm_user", JSON.stringify(userInfo))
      // Then set user state
      setUser(userInfo)
      // Use window.location for a full page reload
      window.location.href = "/dashboard"
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Login with Google
  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      
      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
        provider: "google",
        role: "admin"
      }

      // Update local storage first
      localStorage.setItem("crm_user", JSON.stringify(userInfo))
      // Then set user state
      setUser(userInfo)
      // Wait for next tick before redirect to ensure state is updated
      await new Promise(resolve => setTimeout(resolve, 0))
      window.location.href = "/dashboard"
      return { success: true }
    } catch (error) {
      console.error("Google login error:", error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout
  const logout = () => {
    const auth = getAuth(app)
    auth.signOut().then(() => {
      // Clear user data
      setUser(null)
      localStorage.removeItem("crm_user")
      // Force reload to landing page
      window.location.href = "/"
    }).catch((error) => {
      console.error("Logout error:", error)
    })
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loginWithGoogle, 
        loginWithCredentials,
        logout, 
        isLoading,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
