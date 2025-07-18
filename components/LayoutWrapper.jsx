"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  if (pathname === "/login") {
    return children;
  }
  return <SidebarProvider>{children}</SidebarProvider>;
} 