"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, Users, ShoppingCart, BarChart3, MessageSquare } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      {/* 🌈 Fullscreen background gradient */}
      <div className="fixed inset-0 z-[-1] gradient-secondary" />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 text-foreground animate-fade-in">
        <div className="max-w-2xl w-full text-center py-16 animate-slide-up">
          <div className="flex justify-center mb-6">
            <span className="gradient-primary p-4 rounded-full inline-flex items-center justify-center shadow-xl animate-scale-in">
              <Store className="h-10 w-10 text-white" />
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            CRM Heist
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            The all-in-one platform to manage your customers, orders, support, and marketing for your business.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Get Started
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-4 animate-slide-up">
          <FeatureCard
            icon={<Users className="h-8 w-8 text-blue-600" />}
            title="Customer Management"
            desc="Track, segment, and engage your customers with ease."
          />
          <FeatureCard
            icon={<ShoppingCart className="h-8 w-8 text-green-600" />}
            title="Order Processing"
            desc="Manage orders, fulfillment, and returns efficiently."
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8 text-purple-600" />}
            title="Support Tickets"
            desc="Resolve customer issues quickly with integrated support."
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-orange-600" />}
            title="Analytics & Reports"
            desc="Gain insights with real-time analytics and reports."
          />
        </div>
        <footer className="mt-16 text-muted-foreground text-sm text-center px-4">
          &copy; {new Date().getFullYear()} CRM Heist. All rights reserved.
        </footer>
      </main>
    </>
  );
}


function FeatureCard({ icon, title, desc }) {
  return (
    <div className="card-interactive p-6 flex flex-col items-center text-center h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}