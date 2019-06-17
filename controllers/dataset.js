const User = require('../User_model')

var fn_dataset = async (ctx, next) => {
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
    
    ctx.render('dataset.html', {userInfo:user_one});
}

module.exports = {
    'GET /dataset': fn_dataset,
}