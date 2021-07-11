import { ObjectId } from "mongodb";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MessageModel, Room, RoomModel } from "../entities/room";
import { ObjectIdScalar } from "../lib/objectId.scalar";
import { Context } from "../lib/types";

@Resolver()
export class RoomResolver {
	@Query(() => [Room])
	public async rooms() {
		return RoomModel.find();
	}

	@Query(() => Room, { nullable: true })
	public async getRoomById(@Arg("id", () => ObjectIdScalar) id: ObjectId) {
		return await RoomModel.findOne({ _id: id });
	}

	@Mutation(() => Room)
	public async createRoom() {
		const newRoom = new RoomModel();
		return await newRoom.save();
	}

	@Mutation(() => Room, { nullable: true })
	public async sendMessage(
		@Arg("roomId", () => ObjectIdScalar) roomId: ObjectId,
		@Arg("content") content: string,
		@Ctx() { req }: Context
	) {
		if (!req.session.userId) return;

		const room = await RoomModel.findOne({ _id: roomId } as Room);

		room.messages.push(
			new MessageModel({ authorId: req.session.userId, content })
		);
		return await room.save();
	}
}
