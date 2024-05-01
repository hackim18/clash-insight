const request = require("supertest");
const app = require("../app");

const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

beforeAll(async () => {
  await queryInterface.bulkDelete("Users", null, {});
});

describe("Registration Endpoint Test", () => {
  test("should successfully register a new user", async () => {
    const response = await request(app).post("/register").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email", "test@example.com");
  });

  test("should return status 400 if email is missing", async () => {
    const response = await request(app).post("/register").send({
      password: "password123",
    });

    expect(response.statusCode).toBe(400);
  });

  test("should return status 400 if password is missing", async () => {
    const response = await request(app).post("/register").send({
      email: "test@example.com",
    });

    expect(response.statusCode).toBe(400);
  });

  test("should return status 400 if email is already registered", async () => {
    // Register a user first
    await User.create({
      email: "existing@example.com",
      password: hashPassword("password123"),
    });

    const response = await request(app).post("/register").send({
      email: "existing@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});
