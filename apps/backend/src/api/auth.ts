import { Hono } from "hono";
import { auth as ext_auth } from "@rc-chat/shared/lib/auth";

export const auth = new Hono();

auth.basePath("/auth");

auth.get("/signup", (c) => {
	return c.json({ message: "Signup page" });
})

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
