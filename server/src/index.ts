import { ApolloServer } from "apollo-server-express";
import MongoStore from "connect-mongo";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import { connect } from "mongoose";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { __prod__ } from "./lib/constants";
import { Context } from "./lib/types";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";

(async () => {
	await connect(process.env.MONGO_URI, {
		dbName: "lynkr",
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	});

	const app = express();

	app.use(
		session({
			secret: process.env.SESSION_SECRET,
			store: MongoStore.create({
				mongoUrl: process.env.MONGO_URI,
				dbName: "lynkr"
			}),
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 7.2e5,
				secure: __prod__
			}
		})
	);

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, UserResolver],
			validate: false
		}),
		context: async ({ req }) => ({ req } as Context)
	});

	server.applyMiddleware({ app, cors: { credentials: true, origin: true } });

	app.listen(process.env.PORT, () =>
		console.log(
			`🚀 Server started at http://localhost:${process.env.PORT}${server.graphqlPath}`
		)
	);
})();
