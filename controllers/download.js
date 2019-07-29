const User = require('../User_model')

var fn_download = async (ctx, next) => {
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
    
    ctx.render('download.html', {userInfo:user_one});
}

module.exports = {
    'GET /download': fn_download,
}