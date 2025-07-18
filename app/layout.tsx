import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "India E-Commerce CRM Portal",
  description: "Comprehensive CRM solution for Indian e-commerce businesses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <LayoutWrapper>
              {children}
              <Toaster />
            </LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
