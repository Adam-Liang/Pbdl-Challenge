const User = require('../User_model');

var fn_upload_next = async (ctx, next) => {
    var email = ctx.cookies.get('userEmail');
    if (email) {
        var user_one = await User.findOne({
            where:{
                email:email
            }
        });
        if (!user_one) {
            ctx.render('upload_login_invalid.html');
        }
    } else {
        ctx.render('upload_login_erruser.html');
    }
    
    var fs = require("fs");
    var path = require("path");
    const file = ctx.request.files.file;
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../files/upload/') + `/${user_one.id}.zip`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.render('upload_success.html',{userInfo:user_one});
}
module.exports = {
    'POST /upload_next': fn_upload_next
}