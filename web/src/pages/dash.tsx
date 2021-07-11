import { gql, useQuery } from "@apollo/client";
import { FC } from "react";
import Loading from "../components/common/Loading";

const GET_ME = gql`
	query Me {
		me {
			_id
			name
		}
	}
`;

const Dash: FC = () => {
	const { loading, data } = useQuery(GET_ME);
	if (loading) return <Loading />;

	return (
		<div>
			{data.me._id} | {data.me.name}
		</div>
	);
};

export default Dash;
