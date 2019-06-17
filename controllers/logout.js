var fn_logout = async (ctx, next) => {
    ctx.cookies.set(
        'userEmail',null
    );
}

module.exports = {
    'GET /logout': fn_logout
}