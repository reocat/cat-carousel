
import "/public/globals.css";
import { Inter } from "next/font/google";
import StoreProvider from "@/app/redux/storeProvider";
import React, { ReactNode } from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Random Animal Image Carousel",
  description:
    "✨Nyan, onii-chan, this is a small site with kawaii animals!✨ OwO",
};

export default function RootLayout({ children }:{children:ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
