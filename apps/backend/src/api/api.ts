import { Hono } from "hono";

export const api = new Hono();

api.basePath("/api");

api.get("/version", (c) => c.json({"version": "1.0.0"}));
api.get("/health", async (c) => {
	return c.json({ "status": "ok" });
})
