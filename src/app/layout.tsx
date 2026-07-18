import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderComponent from "@/providers/ThemeProviderComponent"
import Navbar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";
import MobileNav from "@/components/shared/MobileNav";
import ChatWidgetGate from "@/components/shared/ChatWidgetGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forever Paws",  
  description: "A place where pet lovers connect, share stories, and find their perfect companions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProviderComponent>
          <ToastContainer/>
          <Navbar />
          <main>
            {children}
            <MobileNav/>
          </main>
          <Footer />
          <ChatWidgetGate />
        </ThemeProviderComponent>
      </body>
    </html>
  );
}
