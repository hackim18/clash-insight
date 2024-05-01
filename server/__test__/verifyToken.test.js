const axios = require("axios");
const { verifyToken } = require("../controllers/controller");

jest.mock("axios");

describe("verifyToken function test", () => {
  test("should return player verification data if request is successful (status 200)", async () => {
    const playerTag = "#2290UCLVV";
    const token = "zmzg64h8";

    const req = { params: { playerTag }, body: { token } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    const responseData = { verification: "data" };
    const response = { status: 200, data: responseData };
    axios.post.mockResolvedValue(response);

    await verifyToken(req, res, next);

    expect(axios.post).toHaveBeenCalledWith(
      `https://api.clashofclans.com/v1/players/%232290UCLVV/verifytoken`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(responseData);
    expect(next).not.toHaveBeenCalled();
  });

  test("should handle error if request fails", async () => {
    const playerTag = "#2290UCLVV";
    const token = "zmzg64h8";

    const req = { params: { playerTag }, body: { token } };
    const res = {};
    const next = jest.fn();

    const error = new Error("API request failed");
    axios.post.mockRejectedValue(error);

    await verifyToken(req, res, next);

    expect(axios.post).toHaveBeenCalledWith(
      `https://api.clashofclans.com/v1/players/%232290UCLVV/verifytoken`,
      { token },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      }
    );
    expect(next).toHaveBeenCalledWith(error);
  });
});
