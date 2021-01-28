import type { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default CustomApp;
