import { Rubik, Inter } from "next/font/google";

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
      <body className={`${rubik.variable} ${inter.variable}`}>{children}</body>
    </html>
  );
}
