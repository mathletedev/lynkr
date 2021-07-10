import "dotenv-safe/config";
import { OAuth2Client } from "google-auth-library";

export const authClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const getTicket = async (token: string) =>
	await authClient.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID
	});

export const getUser = async (token: string) =>
	(await getTicket(token)).getPayload();
