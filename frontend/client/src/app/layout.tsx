import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/Layout/navBar";
import {  ThemeProvider } from "@/components/theme-provider";
import Container from "@/components/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dinehub app",
  description: "you are one click away from your next meal",
  icons: [
    {
      url: "/logo.png",
      sizes: "64x64 32x32 24x24 16x16",
      type: "image/png"
    },
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>

        <body className={inter.className}>
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <main className="flex flex-col min-h-screen bg-secondary">
            <NavBar />
            <section className="flex-grow">
              <Container>
              {children}
              </Container>
            </section>
          </main>
          </ThemeProvider>
        </body>

      </html>
    </ClerkProvider>
  );
}
