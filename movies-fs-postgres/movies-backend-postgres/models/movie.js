const { Model, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title can not be empty",
        },
        len: {
          args: [2, Infinity],
          msg: "Title must be at least 2 characters long",
        },
      },
    },
    watchlist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: "movie",
  },
);

module.exports = Movie;
