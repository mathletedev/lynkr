import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache
} from "@apollo/client";
import { AppProps } from "next/app";
import { FC } from "react";
import "tailwindcss/tailwind.css";
import Layout from "../components/common/Layout";
import LoggedIn from "../components/common/LoggedIn";
import { __serverUri__ } from "../lib/constants";
import { getBasePath, getPageName } from "../lib/util";

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: createHttpLink({
		uri: __serverUri__,
		credentials: "include"
	})
});

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
	return (
		<ApolloProvider client={client}>
			<Layout
				title={getPageName(router.pathname)}
				showNav={getBasePath(router.pathname) === "r"}
			>
				<LoggedIn>{<Component {...pageProps} />}</LoggedIn>
			</Layout>
		</ApolloProvider>
	);
};

export default App;
