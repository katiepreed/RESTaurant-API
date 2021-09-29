// importing sequelize
const {Sequelize} = require('sequelize');
// whenever we deal with the file system in Node.js we should use its in-built path module
const path = require('path');

// this statement returns a path to the same diectory as db.js but with db.sqlite as the filename
const storage = path.join(__dirname, 'db.sqlite');

// configring a new database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage,
});

// export the database connection
module.exports = sequelize;