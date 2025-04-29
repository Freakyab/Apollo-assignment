import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apollo 24/7",
  description: "Find the best doctors in India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find the best doctors in India" />
        <meta name="keywords" content="Doctors, Healthcare, Apollo 24/7, India" />
        <meta name="author" content="Apollo 24/7" />
        <meta property="og:title" content="Apollo 24/7" />
        <meta property="og:description" content="Find the best doctors in India" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.apollo247.com" />
        <meta property="og:image" content="https://www.apollo247.com/logo.png" />
        <link rel="canonical" href="https://www.apollo247.com" />
      </head>
      <body className={inter.className}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
