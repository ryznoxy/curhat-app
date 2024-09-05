"use client";
import { ThemeProvider } from "@/components/provider/themeProvider";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "../Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function Layouts({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider>
        <Navbar />
        <div className="max-w-3xl mx-auto px-4">
          {children}
          <Toaster />
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}
