const User = require('../User_model');

var fn_signin_next = async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        password = ctx.request.body.password || '';
    console.log(`signin with email: ${email} , password: ${password}`);
    //查询是否存在此邮箱
    var user = await User.findOne({
        where: {
            email: email
        }
    })
    if (!user) {
        ctx.render('signin_not_fond.html', {});
    } else {
        if (user.password === password) {
            ctx.cookies.set(
                'userEmail',email,{
                    maxAge: 14*24*60*60*1000,   // cookie有效时长
                }
            );
            ctx.render('signin_ok.html', {userInfo:user});
        } else {
            ctx.render('signin_wrong_password.html', {});
        }
    }

    
}

module.exports = {
    'POST /signin_next': fn_signin_next
}