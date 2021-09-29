const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Company extends Model {}

Company.init(
    {
        name: DataTypes.STRING,
        logoUrl: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'company',
        timestamps: false,
    }
);

module.exports = Company;
