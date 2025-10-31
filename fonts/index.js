import { Montserrat, Poppins } from "next/font/google";

const montserrat = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export { montserrat };
