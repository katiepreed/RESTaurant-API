const Company = require("./companies");
const Menu = require("./menus");
const Location= require("./locations")
const sequelize = require("./db");

async function setupDb() {
    Company.hasMany(Location);
    Location.belongsTo(Company);
    Company.hasMany(Menu);
    Menu.belongsTo(Company);
    await sequelize.sync();
}

module.exports = setupDb;