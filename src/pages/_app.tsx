import type { AppProps } from "next/app";
import Head from "next/head";
import { ReactNode } from "react";
import ModalProvider from "src/components/ModalProvider";
import SnackbarProvider from "src/components/SnackbarProvider";
import "tailwindcss/tailwind.css";
import { ProvideAuth } from "../lib/auth";
import "../styles/app.css";

function CustomApp({ Component, pageProps }: AppProps) {
  // @ts-expect-error
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <ProvideAuth>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ee254c" />
        <meta name="apple-mobile-web-app-title" content="Quice" />
        <meta name="application-name" content="Quice" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ModalProvider>
        <SnackbarProvider>
          {getLayout(<Component {...pageProps} />)}
        </SnackbarProvider>
      </ModalProvider>
    </ProvideAuth>
  );
}

export default CustomApp;
