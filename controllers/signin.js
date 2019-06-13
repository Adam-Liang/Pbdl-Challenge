var fn_signin = async (ctx, next) => {
    ctx.render('signin.html',{});
}

module.exports = {
    'GET /signin': fn_signin
}