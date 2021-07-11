import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../lib/objectId.scalar";

@ObjectType()
export class Message {
	@Field(() => ObjectIdScalar)
	@Property({ required: true })
	public authorId: ObjectId;

	@Field()
	@Property({ required: true })
	public content: string;
}

@ObjectType()
export class Room {
	@Field(() => ObjectIdScalar)
	public readonly _id: ObjectId;

	@Field(() => [Message])
	@Property({ required: true, type: [Message] })
	public messages: Message[] = [];
}

export const RoomModel = getModelForClass(Room);
export const MessageModel = getModelForClass(Message);
