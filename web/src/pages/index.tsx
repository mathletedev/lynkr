import { gql, useQuery } from "@apollo/client";
import { FC } from "react";

const GET_HELLO = gql`
	query {
		hello
	}
`;

const Home: FC = () => {
	const { loading, data } = useQuery(GET_HELLO);
	if (loading) return <div>Loading...</div>;

	return <div>{data.hello}</div>;
};

export default Home;
