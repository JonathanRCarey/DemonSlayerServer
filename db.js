const Sequelize = new Sequelize (process.env.DATABASE_URL,{
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
})
const sequelize = new Sequelize("postgres://postgres:Undertale7@localhost:5432/Demon-Slayer");

module.exports = sequelize;