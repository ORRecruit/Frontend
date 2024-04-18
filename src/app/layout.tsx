"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./authProvider";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.title = "Online Remote Recruiting";
  });
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            <Toaster
              toastOptions={{ duration: 4000, style: { zIndex: 999999 } }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
