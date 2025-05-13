import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salina Youth Basketball Club",
  description: "Website for managing youth basketball teams in Salina, Kansas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-montserrat">{children}</body>
    </html>
  );
}
