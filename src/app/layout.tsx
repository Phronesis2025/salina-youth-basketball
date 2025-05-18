import { Rubik, Inter, Montserrat, Bebas_Neue } from "next/font/google";
import "./global.css";
import ClientLayout from "./ClientLayout";

// Define Rubik font
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-rubik",
  display: "swap",
});

// Define Inter font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

// Define Montserrat font (for Footer)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});

// Define Bebas Neue font (for Footer)
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata = {
  title: "World Class Sports - Salina Youth Basketball",
  description:
    "Join the Salina Youth Basketball Club for competitive teams, summer camps, and community engagement in Salina, KS.",
  metadataBase: new URL("https://www.wcshoops.com"), // Update with your production domain
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "World Class Sports - Salina Youth Basketball",
    description:
      "Discover Salina Youth Basketball Club’s teams, schedules, and programs in Salina, KS.",
    url: "https://www.wcshoops.com",
    siteName: "World Class Sports",
    images: [
      {
        url: "/images/WCS Logo-transparentBG.png",
        width: 120,
        height: 48,
        alt: "World Class Sports Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${inter.variable} ${montserrat.variable} ${bebasNeue.variable} bg-[#002C51] text-white flex flex-col min-h-screen`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
