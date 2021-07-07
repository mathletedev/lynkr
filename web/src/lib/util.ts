import { __pageNames__ } from "./constants";

export const getBasePath = (pathname: string) => pathname.split("/")[1];
export const getPageName = (pathname: string) =>
	__pageNames__[getBasePath(pathname)];
