import { Rubik, Inter, Montserrat, Bebas_Neue } from "next/font/google";
import "./global.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { cn } from "@/lib/utils";

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
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "World Class Sports - Salina Youth Basketball",
    description:
      "Discover Salina Youth Basketball Club's teams, schedules, and programs in Salina, KS.",
    url: "https://www.wcshoops.com", // Update with your domain
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="preload"
          href="/images/WCS Logo-transparentBG.png"
          as="image"
        />
        <link rel="preload" href="/videos/hype-video.mp4" as="video" />
        <link rel="preload" href="/images/placeholder-news.png" as="image" />
        <link
          rel="preload"
          href="/images/placeholder-team-default.jpg"
          as="image"
        />
        <link rel="preload" href="/images/team-thunderhawks.jpg" as="image" />
        <link rel="preload" href="/images/team-firebolts.jpg" as="image" />
        <link rel="preload" href="/images/team-stingers.jpg" as="image" />
        <link rel="preload" href="/images/team-lightning.jpg" as="image" />
        <link rel="preload" href="/images/team-vipers.jpg" as="image" />
        <link rel="preload" href="/images/team-raptors.jpg" as="image" />
        <link rel="preload" href="/images/placeholder-logo.png" as="image" />
      </head>
      <body
        className={cn(
          rubik.variable,
          inter.variable,
          montserrat.variable,
          bebasNeue.variable,
          "min-h-screen flex flex-col"
        )}
      >
        <Navbar />
        <main className="flex-grow" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
