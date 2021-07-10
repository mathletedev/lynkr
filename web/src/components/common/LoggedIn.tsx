import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";
import { getBasePath } from "../../lib/util";

const CURRENT_USER = gql`
	query Me {
		me {
			_id
		}
	}
`;

const LoggedIn: FC = ({ children }) => {
	const { loading, data } = useQuery(CURRENT_USER);
	if (loading) return <div>Loading...</div>;

	const router = useRouter();
	if (getBasePath(router.pathname) === "login" && data.me) router.push("/");
	else if (!getBasePath(router.pathname) && !data.me) router.push("/login");

	return <Fragment>{children}</Fragment>;
};

export default LoggedIn;
