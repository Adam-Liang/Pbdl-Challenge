const User = require('../User_model')

var fn_tasks = async (ctx, next) => {
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
    
    ctx.render('tasks.html', {userInfo:user_one});
}

module.exports = {
    'GET /tasks': fn_tasks,
}