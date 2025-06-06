import "../src/styles/global.css";
import type { AppProps } from "next/app";
import Footer from "../src/components/common/Footer";
import Navbar from "../src/components/common/Navbar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar cartItemCount={0} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}