//定义sequelize
const Sequelize = require('sequelize');
const config = require('./mysql_config');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
var User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement:true
    },
    name: {
        type: Sequelize.STRING(100),
        unique:true
    },
    password: Sequelize.STRING(32),
    email: {
        type: Sequelize.STRING(100),
        unique:true
    },
    score_1: Sequelize.FLOAT,
    score_2: Sequelize.FLOAT,
    score_3: Sequelize.FLOAT,
    score_total: Sequelize.FLOAT,
    last_submit_datetime:Sequelize.DATE,
    state: Sequelize.INTEGER
}, {
        timestamps: false
});

module.exports = User;