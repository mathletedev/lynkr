import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import Room from "../../components/rooms/Room";

interface Props {
	roomId: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ["/r/hello", "/r/test"],
		fallback: false
	};
};

export const getStaticProps: GetStaticProps<Props> = async (context) => ({
	props: {
		roomId: context.params?.id as string
	}
});

const _Room: FC<Props> = ({ roomId }) => {
	return <Room roomId={roomId} />;
};

export default _Room;
