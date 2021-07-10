import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../entities/user";
import { getUser } from "../lib/auth";
import { Context } from "../lib/types";

@Resolver()
export class UserResolver {
	@Query(() => [User])
	public async users() {
		return await UserModel.find();
	}

	@Query(() => User, { nullable: true })
	public async me(@Ctx() { req }: Context) {
		if (!req.session.userId) return null;

		const user = await UserModel.findOne({ _id: req.session.userId } as User);
		if (!user) return null;

		return user;
	}

	@Mutation(() => User, { nullable: true })
	public async login(@Arg("token") token: string, @Ctx() { req }: Context) {
		try {
			const { email, name, picture } = await getUser(token);
			let user = await UserModel.findOne({ email } as User);

			if (!user) {
				user = new UserModel({ email, name, picture } as User);
				await user.save();
			}

			req.session.userId = user._id;
			return user;
		} catch (_) {
			return;
		}
	}
}
