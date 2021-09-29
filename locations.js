const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Location extends Model {}

Location.init(
    {
        name: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
        manager: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'location',
        timestamps: false,
    }
);

module.exports = Location;
