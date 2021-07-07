import { AppProps } from "next/app";
import { FC } from "react";
import "tailwindcss/tailwind.css";
import Layout from "../components/common/Layout";
import { getBasePath, getPageName } from "../lib/util";

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
	return (
		<Layout
			title={getPageName(router.pathname)}
			showNav={!["", "login", "dash"].includes(getBasePath(router.pathname))}
		>
			{<Component {...pageProps} />}
		</Layout>
	);
};

export default App;
