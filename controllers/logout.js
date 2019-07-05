var fn_logout = async (ctx, next) => {
    ctx.cookies.set(
        'userEmail',null
    );
    ctx.render('logout.html');
}

module.exports = {
    'GET /logout': fn_logout
}