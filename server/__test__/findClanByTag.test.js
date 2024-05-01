const axios = require("axios");
const { findClanByTag } = require("../controllers/controller");

jest.mock("axios");

describe("findClanByTag function test", () => {
  test("should return clan data if request is successful (status 200)", async () => {
    const req = { params: { tag: "#clanTag" } };
    const res = { json: jest.fn() };
    const next = jest.fn();

    const responseData = { clan: "data" };
    const response = { status: 200, data: responseData };
    axios.get.mockResolvedValue(response);

    await findClanByTag(req, res, next);

    expect(axios.get).toHaveBeenCalledWith("https://api.clashofclans.com/v1/clans/%23clanTag", {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
      },
    });
    expect(res.json).toHaveBeenCalledWith(responseData);
    expect(next).not.toHaveBeenCalled();
  });

  test("should handle error if request fails", async () => {
    const req = { params: { tag: "#clanTag" } };
    const res = {};
    const next = jest.fn();

    const error = new Error("API request failed");
    axios.get.mockRejectedValue(error);

    await findClanByTag(req, res, next);

    expect(axios.get).toHaveBeenCalledWith("https://api.clashofclans.com/v1/clans/%23clanTag", {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
      },
    });
    expect(next).toHaveBeenCalledWith(error);
  });
});
