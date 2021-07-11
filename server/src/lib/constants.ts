export const __prod__ = process.env.NODE_ENV === "production";
export const __clientUri__ = __prod__ ? "" : "http://localhost:3000";
export const __serverUri__ = __prod__ ? "" : "http://localhost:4000";
