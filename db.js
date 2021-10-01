const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:dokkanbattle2020@localhost:5432/Demon-Slayer");

module.exports = sequelize;