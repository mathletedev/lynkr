import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AppProps } from "next/app";
import { FC } from "react";
import "tailwindcss/tailwind.css";
import Layout from "../components/common/Layout";
import { __serverUrl__ } from "../lib/constants";
import { getBasePath, getPageName } from "../lib/util";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: __serverUrl__
});

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
	return (
		<ApolloProvider client={client}>
			<Layout
				title={getPageName(router.pathname)}
				showNav={getBasePath(router.pathname) === "r"}
			>
				{<Component {...pageProps} />}
			</Layout>
		</ApolloProvider>
	);
};

export default App;
