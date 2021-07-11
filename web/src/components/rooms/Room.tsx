import { gql, useQuery } from "@apollo/client";
import { FC, Fragment } from "react";
import Loading from "../common/Loading";

const GET_ROOM = gql`
	query Room($id: String!) {
		getRoomById(id: $id) {
			messages {
				content
			}
		}
	}
`;

interface Props {
	roomId: string;
}

const Room: FC<Props> = ({ roomId }) => {
	const { loading, data } = useQuery(GET_ROOM, { variables: { id: roomId } });
	if (loading) return <Loading />;

	return (
		<Fragment>
			{data.getRoomById.messages.content.map(({ content }: any) => (
				<div>{content}</div>
			))}
		</Fragment>
	);
};

export default Room;
