"use client";

import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./@utils/ThemeProvider";
import { Providers } from "./provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlices";
import Loading from "./@components/Loading";
import { useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="!bg-white bg-no-repeat text-black dark:text-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300">
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Layout>{children}</Layout>
              <Toaster position="bottom-right" />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Layout = ({ children }) => {
  const { isLoading, refetch } = useLoadUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isLoading) {
      const timeoutId = setTimeout(refetch, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading, refetch]);

  if (!mounted) {
    return <Loading />;
  }

  return (
    <div className={`${poppins.variable} ${josefin.variable}`}>{children}</div>
  );
};
