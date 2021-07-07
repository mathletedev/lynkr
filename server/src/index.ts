import { ApolloServer } from "apollo-server-express";
import express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

(async () => {
	const app = express();

	const server = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver],
			validate: false
		})
	});

	server.applyMiddleware({ app });

	app.listen(process.env.PORT, () =>
		console.log(
			`🚀 Server started at http://localhost:${process.env.PORT}${server.graphqlPath}`
		)
	);
})();
