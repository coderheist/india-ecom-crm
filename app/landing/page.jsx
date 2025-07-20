// "use client";
// import LandingPage from "../page";

// export default function LandingRoute() {
//   return <LandingPage />;
// } 
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, Users, ShoppingCart, BarChart3, MessageSquare, Menu, Image as ImageIcon } from "lucide-react";
import React, { useState } from "react";

// --- Data for Features Section ---
const featuresData = [
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Customer Management",
    desc: "A complete suite to track, segment, and engage your customers.",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-green-500" />,
    title: "Order Processing",
    desc: "Efficiently manage your entire order lifecycle from cart to delivery.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
    title: "Integrated Support",
    desc: "Resolve customer issues quickly with a built-in ticketing system.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-orange-500" />,
    title: "Actionable Analytics",
    desc: "Gain real-time insights into your business performance.",
  },
];


// --- Sub-Components (Ideally in their own files) ---

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-orange-500" />
            <span className="font-bold">CRM Heist</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#features">Features</Link>
          <Link href="#testimonials">Testimonials</Link>
          <Link href="#pricing">Pricing</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="container grid lg:grid-cols-2 gap-12 items-center py-24 sm:py-32">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl">
          The All-in-One CRM for Modern Businesses
        </h1>
        <p className="max-w-[600px] text-muted-foreground md:text-xl">
          Manage customers, orders, support, and marketing campaigns seamlessly. Focus on growing your business, we’ll handle the rest.
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/signup">Get Started for Free</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact-sales">Book a Demo</Link>
          </Button>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-orange-100 dark:bg-gray-800 rounded-lg h-full min-h-[400px]">
        {/* Replace this with an actual screenshot of your app */}
        <ImageIcon className="h-32 w-32 text-orange-300 dark:text-gray-600" />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-card p-6 rounded-lg border flex flex-col items-start gap-4">
      <div className="bg-orange-100 dark:bg-orange-900/50 p-3 rounded-full">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-muted-foreground text-sm">{desc}</p>
    </div>
  );
}

function TestimonialSection() {
    return (
        <section id="testimonials" className="bg-secondary w-full py-20 sm:py-24">
            <div className="container mx-auto text-center">
                <blockquote className="max-w-3xl mx-auto">
                    <p className="text-xl sm:text-2xl font-medium">
                        "This CRM transformed how we operate. Our efficiency has doubled, and customer satisfaction is at an all-time high. A must-have for any serious e-commerce business in India."
                    </p>
                </blockquote>
                <cite className="mt-6 block font-semibold not-italic">
                    Priya Sharma, CEO of Craftly India
                </cite>
            </div>
        </section>
    );
}

function Footer() {
    return(
        <footer className="border-t w-full">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
                <div className="col-span-2 md:col-span-1">
                     <h3 className="font-bold">CRM Heist</h3>
                     <p className="text-sm text-muted-foreground mt-2">Your business, streamlined.</p>
                </div>
                <div>
                    <h4 className="font-semibold">Product</h4>
                    <ul className="space-y-2 mt-4 text-sm text-muted-foreground">
                        <li><Link href="#features" className="hover:text-primary">Features</Link></li>
                        <li><Link href="#pricing" className="hover:text-primary">Pricing</Link></li>
                        <li><Link href="/docs" className="hover:text-primary">Documentation</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold">Company</h4>
                    <ul className="space-y-2 mt-4 text-sm text-muted-foreground">
                        <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                        <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                        <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold">Legal</h4>
                    <ul className="space-y-2 mt-4 text-sm text-muted-foreground">
                        <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t">
                 <p className="container mx-auto py-4 text-sm text-center text-muted-foreground">
                    &copy; {new Date().getFullYear()} CRM Heist. All rights reserved.
                </p>
            </div>
        </footer>
    )
}


// --- Main Landing Page Component ---
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />

        <section id="features" className="container py-20 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Powerful Features, Simplified</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to scale your e-commerce operations, all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresData.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        <TestimonialSection />
        
        <section id="pricing" className="container text-center py-20 sm:py-24">
             <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
             <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of Indian businesses thriving with our CRM.
            </p>
            <Button size="lg" asChild className="mt-8 bg-orange-500 hover:bg-orange-600">
                <Link href="/signup">Sign Up for Free</Link>
            </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}