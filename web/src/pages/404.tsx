import { useRouter } from "next/dist/client/router";
import { FC, Fragment, useEffect } from "react";

const _404: FC = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/");
	});

	return <Fragment></Fragment>;
};

export default _404;
