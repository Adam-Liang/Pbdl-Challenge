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
    name: Sequelize.STRING(100),
    password: Sequelize.STRING(32),
    email: Sequelize.STRING(100)
}, {
        timestamps: false
});

module.exports = User;