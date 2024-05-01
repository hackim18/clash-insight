const axios = require("axios");
const { findPlayerByTag } = require("../controllers/controller");

jest.mock("axios");

describe("findPlayerByTag function test", () => {
  test("should return player data if request is successful (status 200)", async () => {
    const req = { params: { tag: "#playerTag" } };
    const res = { json: jest.fn() };
    const next = jest.fn();

    const responseData = { player: "data" };
    const response = { status: 200, data: responseData };
    axios.get.mockResolvedValue(response);

    await findPlayerByTag(req, res, next);

    expect(axios.get).toHaveBeenCalledWith("https://api.clashofclans.com/v1/players/%23playerTag", {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
      },
    });
    expect(res.json).toHaveBeenCalledWith(responseData);
    expect(next).not.toHaveBeenCalled();
  });

  test("should handle error if request fails", async () => {
    const req = { params: { tag: "#playerTag" } };
    const res = {};
    const next = jest.fn();

    const error = new Error("API request failed");
    axios.get.mockRejectedValue(error);

    await findPlayerByTag(req, res, next);

    expect(axios.get).toHaveBeenCalledWith("https://api.clashofclans.com/v1/players/%23playerTag", {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
      },
    });
    expect(next).toHaveBeenCalledWith(error);
  });
});
