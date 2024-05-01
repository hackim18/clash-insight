"use strict";
const { Model } = require("sequelize");
const getRandomInt = require("../helpers/randomNumber");
module.exports = (sequelize, DataTypes) => {
  class GameAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GameAccount.belongsTo(models.User, { foreignKey: "playerId" });
      GameAccount.belongsTo(models.ProfileImage, { foreignKey: "imgId" });
    }
  }
  GameAccount.init(
    {
      playerId: DataTypes.INTEGER,
      userName: DataTypes.STRING,
      playerTag: DataTypes.STRING,
      imgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GameAccount",
    }
  );
  GameAccount.beforeCreate(async (gameAccount, options) => {
    gameAccount.imgId = getRandomInt(1, 2);
  });
  return GameAccount;
};
