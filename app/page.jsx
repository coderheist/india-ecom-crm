"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, Users, ShoppingCart, BarChart3, MessageSquare, ArrowRight, Star } from "lucide-react";

function FeatureCard({ icon, title, description }) {
  return (
    <div className="card-interactive p-6 text-center space-y-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div className="mx-auto w-fit p-3 rounded-xl bg-muted/50">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function BenefitCard({ title, description }) {
  return (
    <div className="card-interactive p-6 text-center space-y-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                <Store className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">CRM Heist</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="font-medium">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button className="btn-primary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              <span>Trusted by 1000+ businesses</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              The All-in-One{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CRM Platform
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Streamline your customer relationships, boost sales, and grow your business with our comprehensive CRM solution designed for modern teams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 rounded-xl border-2">
              Watch Demo
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <FeatureCard
              icon={<Users className="h-8 w-8 text-blue-600" />}
              title="Customer Management"
              description="Centralize customer data and track interactions across all touchpoints."
            />
            <FeatureCard
              icon={<ShoppingCart className="h-8 w-8 text-green-600" />}
              title="Order Processing"
              description="Streamline order management from creation to fulfillment and delivery."
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-purple-600" />}
              title="Support Tickets"
              description="Provide exceptional customer support with integrated ticketing system."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-orange-600" />}
              title="Analytics & Reports"
              description="Make data-driven decisions with comprehensive analytics and insights."
            />
          </div>

          {/* Benefits Section */}
          <div className="mt-20 space-y-8">
            <h2 className="text-3xl font-bold">Why Choose CRM Heist?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BenefitCard
                title="Easy to Use"
                description="Intuitive interface that your team will love. No training required."
              />
              <BenefitCard
                title="Powerful Features"
                description="Everything you need to manage customers, orders, and grow your business."
              />
              <BenefitCard
                title="Secure & Reliable"
                description="Enterprise-grade security with 99.9% uptime guarantee."
              />
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of businesses that trust CRM Heist to manage their customer relationships.
            </p>
            <Link href="/login">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 rounded-xl">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <Store className="h-5 w-5" />
              </div>
              <span className="font-bold">CRM Heist</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CRM Heist. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}