const User = require('../User_model')

var fn_acknowledgement_and_references = async (ctx, next) => {
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
    
    ctx.render('acknowledgement_and_references.html', {userInfo:user_one});
}

module.exports = {
    'GET /acknowledgement_and_references': fn_acknowledgement_and_references,
}