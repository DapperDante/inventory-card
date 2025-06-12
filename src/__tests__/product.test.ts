import request from "supertest";
import app from "../app";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";
import { Product } from "../models/relation";
import { faker } from "@faker-js/faker";
import { User } from "../models/relation";

describe("Product API", () => {
	let product: any;
	let token: string;
	let idProduct: number;

	beforeAll(async () => {
		product = {
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			stock: faker.number.int({ min: 0, max: 100 }),
			price: parseFloat(faker.commerce.price({ min: 1, max: 1000, dec: 2 })),
		};
		const user = {
			username: faker.internet.username(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};
		const req = await request(app).post("/api/user/signup").send(user);
		token = req.body.token;
	});

	afterAll(async () => {
		await User.destroy({ where: {}, force: true });
		await Product.destroy({ where: {}, force: true });
	});

	it("should create a new product", async () => {
		const res = await request(app)
			.post("/api/product/")
			.set("Authorization", `Bearer ${token}`)
			.send(product);
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("id");
		idProduct = res.body.id;
	});

	it("should get all products", async () => {
		const res = await request(app).get("/api/product/all").set("Authorization", `Bearer ${token}`);
		expect(res.statusCode).toEqual(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBeGreaterThan(0);
	});

	it("should update an existing product", async () => {
		const updatedProduct = { ...product, name: "Updated Product" };
		const res = await request(app)
			.put(`/api/product/${idProduct}`)
			.set("Authorization", `Bearer ${token}`)
			.send(updatedProduct);
		expect(res.statusCode).toEqual(200);
	});

	it("should delete an existing product", async () => {
		const res = await request(app)
			.delete(`/api/product/${idProduct}`)
			.set("Authorization", `Bearer ${token}`);
		expect(res.statusCode).toEqual(204);
	});
});
