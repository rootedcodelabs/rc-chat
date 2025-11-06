import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "../../src/db/schema";

export const db = drizzle(process.env.DB_FILE_NAME!, { schema });
