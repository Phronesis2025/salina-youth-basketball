import '../src/styles/global.css';
import type { AppProps } from 'next/app';
import Footer from '../src/components/common/Footer';
import Navbar from '../src/components/common/Navbar';

export const metadata = {
  title: 'World Class Sports - Salina Youth Basketball',
  description:
    'Join the Salina Youth Basketball Club for competitive teams, summer camps, and community engagement in Salina, KS.',
  metadataBase: new URL('https://www.wcshoops.com'), // Update with your production domain
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'World Class Sports - Salina Youth Basketball',
    description:
      "Discover Salina Youth Basketball Club's teams, schedules, and programs in Salina, KS.",
    url: 'https://www.wcshoops.com',
    siteName: 'World Class Sports',
    images: [
      {
        url: '/images/WCS Logo-transparentBG.png',
        width: 120,
        height: 48,
        alt: 'World Class Sports Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar cartItemCount={0} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
