import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/provider/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Curhatify",
  description: "Create and share curhatan to others and get feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <div className="max-w-3xl mx-auto px-4">
            <div>{children}</div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
