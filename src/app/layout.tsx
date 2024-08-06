// File: src/app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./clientWrapper";

const inter = Inter({ subsets: ["latin"] });

export { metadata } from "./meta";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
