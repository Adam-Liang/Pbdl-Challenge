const child_process = require('child_process');


function fn_iou(user) {
    const exec = child_process.exec;
    var arg1 = user.id.toString();
    console.log('python ../py_mod/main.py ' + arg1);
    
    exec("python ./py_mod/main.py "+arg1, function (error, stdout, stderr) {
        var iou=stdout.substring(0,stdout.indexOf(' '))*1;//转为数字
        var iserr=stdout.substring(stdout.indexOf(' ')+1)*1;//0为ok，1为err

        if(iserr){
            user.state=3;
            user.save();
        } else {
            user.score_total=iou;
            user.state=2;
            user.save();
        }
        if (error) {
            //stderr=unescape(stderr.replace(/\u/g, "%u"));
            user.state=4;
            user.save();
            console.info('err : ' + error);
            console.info('stderr : '+stderr);
        }
    })
    
}

module.exports = fn_iou;