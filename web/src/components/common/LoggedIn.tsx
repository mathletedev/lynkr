import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { FC, Fragment } from "react";
import { getBasePath } from "../../lib/util";
import Loading from "./Loading";

const CURRENT_USER = gql`
	query Me {
		me {
			_id
		}
	}
`;

const LoggedIn: FC = ({ children }) => {
	const { loading, data } = useQuery(CURRENT_USER);

	const router = useRouter();
	if (loading || typeof window === "undefined") return <Loading />;

	if (getBasePath(router.pathname) === "login" && data.me) {
		router.push("/dash");
		return <Loading />;
	}
	if (getBasePath(router.pathname) !== "login" && !data.me) {
		router.push("/login");
		return <Loading />;
	}

	return <Fragment>{children}</Fragment>;
};

export default LoggedIn;
