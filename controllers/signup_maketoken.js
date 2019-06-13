const User = require('../User_model');
const Wait_for_token = require('../WaitForToken_model');
const nodemailer = require('nodemailer');

var fn_signup_maketoken = async (ctx, next) => {
    
    const config = {
        host: 'smtp.qq.com',
        port: 465,
        auth: {
            user: '605222023@qq.com',
            pass: 'yucrqegccudabebg'
        }
    }
    const transporter = nodemailer.createTransport(config);

    var email = ctx.query.email;
    var token = create_6_number();

    var user = await User.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        ctx.body = { success: false, message: "账号已经存在" };
    } else {
        ctx.body = { success: true, message: "账号可用" };
        var mail = {
            from: '605222023@qq.com',
            subject: '注册验证码',
            to: email,
            text: `这是一封来自PBDL的邮件，您的注册验证码是${token}。
如果这个行为不是由您本人操作的，请忽略这封邮件。`
        };
        var user_for_token = await Wait_for_token.findOne({
            where: {
                email:email
            }
        });
        if (user_for_token) {
            user_for_token.token = token;
            await user_for_token.save();
        } else {
            var wait_for_token = await Wait_for_token.create({
                email: email,
                token: token
            });
        }

        await transporter.sendMail(mail, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("发送成功");
            res.send('发送成功');
        })
        
    }
}

function create_6_number() {
    var Num="";
    for(var i=0;i<6;i++)
    {
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}


module.exports = {
    'GET /signup/maketoken': fn_signup_maketoken
}