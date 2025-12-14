import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "snag - Premium E-Commerce",
  description: "Discover and shop premium products with confidence",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <TRPCReactProvider>
          <Navbar />
          {children}
          <Toaster 
            position="bottom-right"
            theme="light"
            richColors
            expand={true}
          />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
