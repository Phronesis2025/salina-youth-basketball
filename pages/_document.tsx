/// <reference types="react" />
import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/core@6.1.15/main.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/list@6.1.15/main.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/daygrid@6.1.15/main.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@fullcalendar/timegrid@6.1.15/main.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
