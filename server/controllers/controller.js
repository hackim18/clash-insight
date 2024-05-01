const { User, GameAccount, ProfileImage } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const midtransClient = require("midtrans-client");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const axios = require("axios");

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

class Controller {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "ValidationError", message: "Email is required" };
      }
      if (!password) {
        throw { name: "ValidationError", message: "Password is required" };
      }
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const passwordMatch = comparePassword(password, user.password);
      if (!passwordMatch) {
        throw { name: "Unauthenticated", message: "Invalid email or password" };
      }

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    // console.log(req.body);

    const { googleToken } = req.body;
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: "311311491871-asdh36mkpe95qjvlvm7frf04ngktqrjf.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const { email } = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { email, password: Math.random().toString() },
      });

      console.log({ user, created });

      const access_token = signToken({ id: user.id });

      res.json({ message: "Login Success", access_token });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async register(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw { name: "ValidationError", message: "Email is required" };
      }
      if (!password) {
        throw { name: "ValidationError", message: "Password is required" };
      }
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        throw { name: "ValidationError", message: "Email is already registered" };
      }
      const user = await User.create(req.body);
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async findPlayerByTag(req, res, next) {
    const { tag } = req.params;
    let accountTag = "";
    try {
      accountTag = tag.startsWith("#") ? tag.slice(1) : tag;

      const response = await axios.get(`https://api.clashofclans.com/v1/players/%23${accountTag}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      });
      if (response.status === 200) {
        res.json(response.data);
      } else {
        throw { name: "AxiosError", message: "Player Not Found" };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async findClanByTag(req, res, next) {
    const { tag } = req.params;
    let clanTag = "";
    try {
      clanTag = tag.startsWith("#") ? tag.slice(1) : tag;

      const response = await axios.get(`https://api.clashofclans.com/v1/clans/%23${clanTag}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      });
      if (response.status === 200) {
        res.json(response.data);
      } else {
        throw new Error(`Failed to fetch clan data. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async playerRankings(req, res, next) {
    const { country } = req.body;

    const { items } = require("../data/locationId.json");
    let location = "";

    if (country !== "global") {
      items.forEach((element) => {
        if (element.name === country) {
          location = element.id;
        }
      });
    } else {
      location = "global";
    }
    const { limit, after, before } = req.query;
    let locationId = location;

    if (!country) {
      locationId = "global";
    }

    try {
      let queryParams = `limit=${limit || 100}`;
      if (after) queryParams += `&after=${after}`;
      if (before) queryParams += `&before=${before}`;

      const response = await axios.get(`https://api.clashofclans.com/v1/locations/${locationId}/rankings/players?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async clanRankings(req, res, next) {
    const { country } = req.body;

    const { items } = require("../data/locationId.json");
    let location = "";

    if (country !== "global") {
      items.forEach((element) => {
        if (element.name === country) {
          location = element.id;
        }
      });
    } else {
      location = "global";
    }
    const { limit, after, before } = req.query;
    let locationId = location;

    if (!country) {
      locationId = "global";
    }

    try {
      let queryParams = `limit=${limit || 100}`;
      if (after) queryParams += `&after=${after}`;
      if (before) queryParams += `&before=${before}`;

      const response = await axios.get(`https://api.clashofclans.com/v1/locations/${locationId}/rankings/clans?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API}`,
        },
      });

      if (response.status === 200) {
        res.status(200).json(response.data);
      } else {
        throw new Error(`Failed to fetch clan rankings data. Status: ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async verifyToken(req, res, next) {
    const { playerTag } = req.params;
    const { token } = req.body;
    let accountTag = "";
    try {
      if (playerTag.startsWith("#")) {
        accountTag = playerTag.slice(1);
      } else {
        accountTag = playerTag;
      }

      const url = `https://api.clashofclans.com/v1/players/%23${accountTag}/verifytoken`;

      const data = {
        token: token,
      };

      const bearerToken = process.env.CLASH_OF_CLANS_API;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearerToken}`,
        },
      };

      const response = await axios.post(url, data, config);
      if (response.status === 200) {
        res.status(200).json(response.data);
      } else {
        throw new Error(`Failed to verify token. Status: ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async addAccount(req, res, next) {
    const { playerTag } = req.body;

    try {
      const existingAccount = await GameAccount.findOne({ where: { playerTag } });
      if (existingAccount) {
        return res.status(400).json({ message: "Player tag already exists" });
      }
      const account = await GameAccount.create({ playerTag, playerId: req.user.id });

      res.status(201).json(account);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getAccount(req, res, next) {
    try {
      const accounts = await GameAccount.findAll({ where: { playerId: req.user.id } });
      res.json(accounts);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getCountry(req, res, next) {
    try {
      const { items } = require("../data/locationId.json");

      const countries = items.filter((item) => item.isCountry);

      res.json(countries);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async deleteAccount(req, res, next) {
    const { id } = req.params;
    try {
      const account = await GameAccount.findByPk(id);
      account.destroy();
      res.json("Test");
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async addImages(req, res, next) {
    console.log("tester");
    try {
      const cloudinary = require("cloudinary").v2;

      cloudinary.config({
        cloud_name: process.env.CLOUND_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });

      const uploadPromises = req.files.map(async (file) => {
        const mimeType = file.mimetype;
        const data = Buffer.from(file.buffer).toString("base64");
        const dataURI = `data:${mimeType};base64,${data}`;
        return cloudinary.uploader.upload(dataURI, {
          overwrite: false,
          unique_filename: true,
        });
      });

      const results = await Promise.all(uploadPromises);

      const images = results.map((element) => {
        return { imgUrl: element.url };
      });

      await ProfileImage.bulkCreate(images);
      res.json(images);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getImage(req, res, next) {
    try {
      const images = await ProfileImage.findAll();
      res.json(images);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async getImageByTag(req, res, next) {
    const { id } = req.params;
    try {
      const images = await ProfileImage.findByPk(id);
      res.json(images);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async deleteImage(req, res, next) {
    const { id } = req.params;
    // const { id } = req.body;
    try {
      const image = await ProfileImage.findByPk(id);
      image.destroy();
      res.json(image);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async changePassword(req, res, next) {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const id = req.user.id;
    try {
      const user = await User.findByPk(id);

      if (confirmNewPassword != newPassword) {
        throw { name: "Unauthenticated", message: "Password not match" };
      }

      const passwordMatch = comparePassword(currentPassword, user.password);
      if (!passwordMatch) {
        throw { name: "Unauthenticated", message: "Invalid current password" };
      }

      const account = await user.update({ password: hashPassword(newPassword) });

      res.json({ email: account.email });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async createTransaction(req, res, next) {
    try {
      const { gross_amount, order_id, description } = req.body;

      const amount = +gross_amount;

      if (typeof amount !== "number") {
        return res.status(400).json({ error: "Gross amount must be a number" });
      }

      if (!order_id || !description) {
        return res.status(400).json({ error: "Order ID and description are required" });
      }

      const parameter = {
        transaction_details: {
          order_id,
          gross_amount: amount,
          description,
        },
      };

      const transaction = await snap.createTransaction(parameter);

      res.status(200).json(transaction);
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  }

  static async updateVip(req, res, next) {
    const id = req.user.id;
    const { vip } = req.body;
    try {
      const user = await User.findByPk(id);
      const output = await user.update({ vip: vip });
      res.json(output);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
