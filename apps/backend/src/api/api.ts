import { Hono } from "hono";
import { auth } from "@rc-chat/shared/lib/auth"

export const api = new Hono();

api.basePath("/api");

api.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

api.get("/version", (c) => c.json({"version": "1.0.0"}));
api.get("/health", async (c) => {
	return c.json({ "status": "ok" });
})
