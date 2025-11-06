import { Hono } from 'hono'
import { db } from "../lib/utils/db"
import { api } from "./api/api"

const app = new Hono();

app.get('/', async (c) => {
		let users = await db.query.usersTable.findMany().then((users) => users);

		if (!users) {
			return c.json({ "message": "No users found" });
		}

			return c.json(users);
})

app.route("/api", api);
export default app;
