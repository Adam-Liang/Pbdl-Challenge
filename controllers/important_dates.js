const User = require('../User_model')

var fn_important_dates = async (ctx, next) => {
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
    
    ctx.render('important_dates.html', {userInfo:user_one});
}

module.exports = {
    'GET /important_dates': fn_important_dates,
}