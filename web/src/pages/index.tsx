import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Loading from "../components/common/Loading";

const Home: FC = () => {
	const router = useRouter();

	useEffect(() => {
		router.push("/dash");
	});

	return <Loading />;
};

export default Home;
