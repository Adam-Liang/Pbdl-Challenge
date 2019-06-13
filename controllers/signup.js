var fn_signup = async (ctx, next) => {
    ctx.render('signup.html',{});
}

module.exports = {
    'GET /signup': fn_signup
}