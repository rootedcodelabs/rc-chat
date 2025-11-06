import { Hono } from 'hono'
import { db } from "../lib/utils/db"
import { api } from "./api/api"
import { serveStatic } from "hono/bun"

const server = new Hono();

if (process.env.NODE_ENV === "production") {
	server.use("*", serveStatic({ root: "./public" }))
}

server.route("/api", api);
export default server;
