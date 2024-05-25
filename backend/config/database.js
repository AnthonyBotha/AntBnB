// backend/config/database.js
const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'postgres://app_academy_projects_u25k_user:8VAwwhkrLapN1o6pizoMRpGKMLxcsibx@dpg-cp91macf7o1s739qheg0-a/app_academy_projects_u25k',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    define: {
      schema: process.env.SCHEMA
    }
  }
};