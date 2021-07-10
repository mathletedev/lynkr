import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { ObjectIdScalar } from "../lib/objectId.scalar";

@ObjectType()
export class User {
	@Field(() => ObjectIdScalar)
	public readonly _id: ObjectId;

	@Field()
	@Property({ required: true, unique: true })
	public email: string;

	@Field()
	@Property({ required: true })
	public name: string;

	@Field()
	@Property({ required: true })
	public picture: string;
}

export const UserModel = getModelForClass(User);
