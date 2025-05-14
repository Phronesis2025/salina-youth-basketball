import { Rubik, Inter } from "next/font/google";
import "./global.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

// Define Rubik font with subsets and weights
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
});

// Define Inter font with subsets and weights
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${inter.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
