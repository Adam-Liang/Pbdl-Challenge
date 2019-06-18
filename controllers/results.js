const User = require('../User_model')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');

var fn_results = async (ctx, next) => {
    var email = ctx.cookies.get('userEmail');
    if (email) {
        var user_one = await User.findOne({
            where:{
                email:email
            }
        });
    } else {
        var user_one;
    }
    
    var users_score = await User.findAll({
        where: {
            score_total: {
                [Op.ne]:null
            }
        },
        order: [
            ['score_total', 'DESC']
        ]
    });

    for (user in users_score) {
        if (users_score[user].last_submit_datetime) {
            users_score[user].last_submit_datetime_format = moment(users_score[user].last_submit_datetime).format("YYYY-MM-DD HH:mm:ss");
        }
        
    }

    ctx.render('results.html', { userInfo: user_one, usersScore: users_score });
}

module.exports = {
    'GET /results': fn_results,
}