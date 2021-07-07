import { FC } from "react";

interface Props {
	roomId: string;
}

const Room: FC<Props> = ({ roomId }) => {
	return <div>{roomId}</div>;
};

export default Room;
