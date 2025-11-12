import Controls from "@/components/controls";
import Nav from "@/components/nav";
import { montserrat, poppins } from "@/fonts";
import { AppProviders } from "./providers";
import "./globals.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                className={`${poppins.className} ${montserrat.variable} w-full h-auto scroll-smooth antialiased bg-white dark:bg-black text-black dark:text-white fill-black dark:fill-white`}
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
