const dbConfig =  require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.acquire,
        idle: dbConfig.idle
    }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user= require('../models/user')(sequelize,Sequelize);
db.post= require('../models/post')(sequelize,Sequelize);
db.employee= require('../models/employee')(sequelize,Sequelize);
db.comment= require('../models/comment')(sequelize,Sequelize);

db.ROLES = ["admin", "tester"];

require('./asscociation')(db)

module.exports = db;
