const User = require('../User_model');
const Wait_for_token = require('../WaitForToken_model');

var fn_signup_next = async (ctx, next) => {
    var
        email = ctx.request.body.email || '',
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '',
        token=ctx.request.body.token||'';
    console.log(`signup with email: ${email} , name: ${name} , password: ${password}`);
    ctx.cookies.set(
        'userEmail',null
    );
    //查询是否存在此邮箱
    var user = await User.findOne({
        where: {
            email: email
        }
    })
    if (user) {
        ctx.render('signup_user_exit.html');
    } else {//无重复用户时需要确认验证码是否对应
        var user_for_token = await Wait_for_token.findOne({
            where: {
                email: email
            }
        })
        if (!user_for_token) {
            ctx.render('signup_please_get_token.html');
        } else if (!(user_for_token.token == token)) {
            ctx.render('signup_wrong_token.html');
        } else {
            var user = await User.create({
                email: email,
                name: name,
                password: password
            });
            await user_for_token.destroy();
            ctx.render('signup_ok.html');
        }
    }

    
}

module.exports = {
    'POST /signup_next': fn_signup_next
}