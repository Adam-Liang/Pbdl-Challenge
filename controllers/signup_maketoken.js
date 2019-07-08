const User = require('../User_model');
const Wait_for_token = require('../WaitForToken_model');
const nodemailer = require('nodemailer');

var fn_signup_maketoken = async (ctx, next) => {
    
    const config = {
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: 'pbdl.ws@outlook.com',
            pass: 'pbdl@iccv'
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
            from: 'pbdl.ws@outlook.com',
            subject: 'PBDL verification',
            to: email,
            text: `Your PBDL website verification code is ${token}.
If this is not yours, please ignore this email.`
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
                //ctx.body = { success: false, message: "邮箱不存在" };
                console.log(err);
                return;
            }
            //ctx.body = { success: true, message: "发送成功" };
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