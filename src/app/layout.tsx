"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/api/queryClient";
import WSStatus from "@/components/WSStatus";
import NetworkStatus from "@/components/NetworkStatus";
import Announcements from "@/components/Announcements";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-black dark:text-white`}>
        <QueryClientProvider client={queryClient}>
          <WSStatus />
          <NetworkStatus />
          <Announcements />
          <ThemeToggle />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}