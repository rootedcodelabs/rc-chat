import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import * as schema from "../../src/db/schema";

export const db = drizzle(process.env.DB_FILE_NAME!, { schema });

export async function runMigrations() {
	try {
		migrate(db, { migrationsFolder: "drizzle" });
	} catch (error) {
		console.error("Error during drizzle migration:", error);
		process.exit(1);
	}
}
