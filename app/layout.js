import { montserrat, poppins, dmSans } from "@/fonts";
import { AppProviders } from "./providers";
import Controls from "@/modules/controls";
import Footer from "@/modules/footer";
import Nav from "@/modules/nav";
import "./globals.css";

export const metadata = {
  title: "My Web Base",
  description: "A robust foundation for web projects",
  openGraph: {
    title: "My Web Base",
    description: "A robust foundation for web projects",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${montserrat.className} h-auto w-full font-medium scroll-smooth bg-black fill-white text-white antialiased`}
      >
        <AppProviders>
          <Controls />
          <Nav />
          <main className="min-h-screen w-full">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
