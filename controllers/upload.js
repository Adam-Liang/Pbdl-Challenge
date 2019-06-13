const User = require('../User_model');

var fn_upload = async (ctx, next) => {
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
    
    ctx.render('upload.html', {userInfo:user_one});
}

module.exports = {
    'GET /upload': fn_upload
}