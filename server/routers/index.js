const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([{ message: "Clash Of Clans API V2" }]);
});
router.post("/login", Controller.login); //
router.post("/google-login", Controller.googleLogin); //
router.post("/register", Controller.register); //
router.get("/find-player/:tag", Controller.findPlayerByTag); //
router.get("/find-clan/:tag", Controller.findClanByTag); //
router.post("/player-rankings", Controller.playerRankings); //
router.post("/clan-rankings", Controller.clanRankings);
router.get("/get-country", Controller.getCountry); //
router.get("/get-image", Controller.getImage); //
router.get("/get-image/:id", Controller.getImageByTag); //
router.use(authentication);
router.post("/players/:playerTag/verifytoken", Controller.verifyToken); //
router.post("/add-account", Controller.addAccount); //
router.get("/get-account", Controller.getAccount); //
router.delete("/delete-account/:id", Controller.deleteAccount); //
router.post("/api/create-transaction", Controller.createTransaction); //
router.put("/update-vip", Controller.updateVip); //

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
router.patch("/add-images", upload.array("images", 5), Controller.addImages); // //admin

router.delete("/delete-image/:id", Controller.deleteImage); // //admin
router.put("/change-password", Controller.changePassword); //

module.exports = router;
