import request from "supertest";
import app from "../server";
import { resetDatabase, insertTestData, closeDatabase } from "./utils";
import jwt from "jsonwebtoken";
import { beforeAll, describe, it, expect, afterAll } from "@jest/globals";

beforeAll(async () => {
  await resetDatabase();
  await insertTestData();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Authentication Routes", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "newuser@test.com",
        password: "testPassword123",
        firstName: "New",
        lastName: "User",
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("email", "newuser@test.com");
      expect(response.body).toHaveProperty("first_name", "New");
    });

    it("should reject registration with existing email", async () => {
      const response = await request(app).post("/api/auth/register").send({
        email: "user@test.com",
        password: "testPassword123",
        firstName: "Duplicate",
        lastName: "User",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message", "User already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with correct credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "user@test.com",
        password: "testPassword123",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.user).toHaveProperty("email", "user@test.com");
    });

    it("should reject login with incorrect password", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "user@test.com",
        password: "wrongPassword",
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid credentials");
    });
  });

  describe("GET /api/auth/profile", () => {
    let token: string;

    beforeAll(async () => {
      const payload = {
        id: 2,
        email: "user@test.com",
        role: "user",
      };
      token = jwt.sign(payload, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "1h",
      });
    });

    it("should retrieve user profile with valid token", async () => {
      const response = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("email", "user@test.com");
    });

    it("should reject profile retrieval without token", async () => {
      const response = await request(app).get("/api/auth/profile");

      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty("message", "No token provided");
    });
  });
});
