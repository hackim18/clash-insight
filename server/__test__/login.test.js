const request = require("supertest");
const app = require("../app");

const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { queryInterface } = sequelize;

beforeAll(async () => {
  const data = require("../data/users.json").map((element) => {
    element.password = hashPassword(element.password);
    element.createdAt = element.updatedAt = new Date();
    return element;
  });
  await queryInterface.bulkInsert("Users", data, {});
});

describe("Authentication Tests", () => {
  test("should successfully login and return access_token", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@example.com",
      password: "123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });

  test("should return status 400 if email is missing", async () => {
    const response = await request(app).post("/login").send({
      password: "123",
    });

    expect(response.statusCode).toBe(400);
  });

  test("should return status 400 if password is missing", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@example.com",
    });

    expect(response.statusCode).toBe(400);
  });

  test("should return status 401 if email or password is invalid", async () => {
    const response = await request(app).post("/login").send({
      email: "admin@example.com",
      password: "wrong_password",
    });

    expect(response.statusCode).toBe(401);
  });
});
