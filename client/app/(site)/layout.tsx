"use client";
import Link from "next/link";
import "../globals.css";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Burger Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <html lang="en">
      <body className="mx-4 py-10">
        <header className="flex">
          <div className="flex flex-column mr-2">
            <Link
              href="/"
              className={`mr-2 ${
                activeLink === "/" ? "text-blue-500 font-bold" : "text-blue-500"
              }`}
              onClick={() => handleLinkClick("/")}
            >
              Shop
            </Link>
            <div className="inline-block border-black border-x-[1px] h-7 rotate-180" />
          </div>
          <div className="flex flex-column mr-2">
            <Link
              href="/shopping_cart"
              className={`mr-2 ${
                activeLink === "/shopping_cart"
                  ? "text-blue-500 font-bold"
                  : "text-blue-500"
              }`}
              onClick={() => handleLinkClick("/shopping_cart")}
            >
              Shopping Cart
            </Link>
            <div className="inline-block border-black border-x-[1px] h-7 rotate-180" />
          </div>
          <div className="flex flex-column mr-2">
            <Link
              href="/history"
              className={`mr-2 ${
                activeLink === "/history"
                  ? "text-blue-500 font-bold"
                  : "text-blue-500"
              }`}
              onClick={() => handleLinkClick("/history")}
            >
              History
            </Link>
          </div>
        </header>
        <main className="py-20">{children}</main>
      </body>
    </html>
  );
}