const User = require('../User_model')

var fn_dataset_generation = async (ctx, next) => {
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
    
    ctx.render('dataset_generation.html', {userInfo:user_one});
}

module.exports = {
    'GET /dataset_generation': fn_dataset_generation,
}