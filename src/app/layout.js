import {Inter} from "next/font/google";
import StoreProvider from "@/app/redux/storeProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Random Cat Image Carousel",
    description: "~Nya~, onii-chan, this is a small site with kawaii nekos!",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}><StoreProvider>{children}</StoreProvider></body>
        </html>
    );
}
