import { Request } from "express";
import session from "express-session";

export type Context = {
	req: Request & { session };
};

declare module "express-session" {
	export interface SessionData {
		userId: string;
	}
}
