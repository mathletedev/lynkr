import Head from "next/head";
import { FC, Fragment } from "react";

interface Props {
	title?: string;
	showNav: boolean;
}

const Layout: FC<Props> = ({ children, title, showNav }) => {
	return (
		<Fragment>
			<Head>
				<title>{title ? `${title} • Lynkr` : "Lynkr"}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta charSet="utf-8" />
			</Head>
			{showNav && (
				<nav>
					<button>Exit Room</button>
				</nav>
			)}
			{children}
		</Fragment>
	);
};

export default Layout;
