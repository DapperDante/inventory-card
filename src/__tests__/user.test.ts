import request from "supertest";
import { serverComponent } from "../components/server.component";
import { faker } from "@faker-js/faker";
import { User } from "../models/relation";
import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";

describe("User API", () => {
	let user: any;
	const app = serverComponent.component
	beforeAll(() => {
		user = {
			username: faker.internet.username(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
	});

	afterAll(async () => {
		await User.destroy({where: {}, force: true});
	});
	
	it("should create a new user", async () => {
		const res = await request(app).post("/api/v1/user/signup").send(user);
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("token");
		expect(res.body.token).not.toBeNull();
	});
	
	it("should login an existing user", async () => {
		const res = await request(app).post("/api/v1/user/login").send({
			username: user.username,
			password: user.password,
		});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("token");
		expect(res.body.token).not.toBeNull();
	});
});
