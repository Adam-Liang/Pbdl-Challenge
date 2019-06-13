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
var Wait_for_token = sequelize.define('wait_for_token', {
    email: {
        type: Sequelize.STRING(100),
        primaryKey:true
    },
    token: Sequelize.INTEGER(6)
}, {
        timestamps: false,
        freezeTableName: true
});

module.exports = Wait_for_token;