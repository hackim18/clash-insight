"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileImage.hasMany(models.GameAccount, { foreignKey: "imgId" });
    }
  }
  ProfileImage.init(
    {
      imgUrl: DataTypes.STRING,
      vipImg: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ProfileImage",
    }
  );
  return ProfileImage;
};
