const request = require("supertest");
const app = require("../app");
// const { sequelize, User } = require("../models");
// const { hashPassword } = require("../helpers/bcrypt");
// const { queryInterface } = sequelize;

// beforeAll(async () => {
//   const data = require("../data/users.json").map((element) => {
//     element.password = hashPassword(element.password);
//     element.createdAt = element.updatedAt = new Date();
//     return element;
//   });
//   await queryInterface.bulkInsert("Users", data, {});
// });

describe("Home Endpoint Test", () => {
  test("should return a message from the home endpoint", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ message: "Clash Of Clans API V2" }]);
  });
});

// afterAll(async () => {
//   await queryInterface.bulkDelete("Users", null, {
//     restartIdentity: true,
//     truncate: true,
//     cascade: true,
//   });
// });
