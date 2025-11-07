import { Hono } from "hono";
import { auth as ext_auth } from "@rc-chat/shared/lib/auth";

export const auth = new Hono();

auth.basePath("/auth");

auth.post("/signup", async (c) => {
	const { name, email, password } = await c.req.json();

	const response = await ext_auth.api.signUpEmail({
		body: {
			name,
			email,
			password,
			callbackURL: "/"
		},
		asResponse: true
	})

	return response;
});

auth.post("/login", async (c) => {
	const { email, password } = await c.req.json();

	const response = await ext_auth.api.signInEmail({
		body: {
			email,
			password,
			callbackURL: "/"
		},
		asResponse: true
	})

	return response;
})

auth.post("/logout", async (c) => {
	const response = await ext_auth.api.signOut({
		headers: c.req.raw.headers,
		asResponse: true
	})

	return response;
})

auth.get("/session", async (c) => {
	const session = await ext_auth.api.getSession({
		headers: c.req.raw.headers,
	});

	return c.json(session);
})
