import Controls from "@/components/controls";
import { AppProviders } from "./providers";
import { montserrat } from "@/fonts";
import Nav from "@/components/nav";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${montserrat.className} w-full h-auto scroll-smooth antialiased bg-white dark:bg-black text-black dark:text-white fill-black dark:fill-white`}
            >
                <AppProviders>
                    <Controls />
                    <Nav />
                    {children}
                </AppProviders>
            </body>
        </html>
    );
}
