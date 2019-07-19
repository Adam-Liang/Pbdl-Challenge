const child_process = require('child_process');
const fs=require('fs');

function fn_iou(user) {
    const exec = child_process.exec;
    const execFile = child_process.execFile;
    const execSync = child_process.execSync;
    var arg1 = user.id.toString();
    console.log("main.exe "+arg1);
    
    /*try{
        execSync("main.exe "+arg1);
        var s=fs.readFileSync(`./files/upload/${user.id}.txt`,'utf-8');
        s=s.toString();
        var iou=s.substring(0,s.indexOf(' '))*1;//转为数字
        var iserr=s.substring(s.indexOf(' ')+1)*1;//0为ok，1为err
        if(iserr){
            user.state=3;
            user.save();
        } else {
            user.score_total=iou;
            user.state=2;
            user.save();
        }
    }catch{
        user.state=4;
        user.save();
        console.info('err : ' + error);
        console.info('stderr : '+stderr);
    }*/
    execFile("main.exe",[arg1], function (error, stdout, stderr) {
        //var iou=stdout.substring(0,stdout.indexOf(' '))*1;//转为数字
        //var iserr=stdout.substring(stdout.indexOf(' ')+1)*1;//0为ok，1为err
        var s=fs.readFileSync(`./files/upload/${user.id}.txt`,'utf-8');
        s=s.toString();
        var iou=s.substring(0,s.indexOf(' '))*1;//转为数字
        var iserr=s.substring(s.indexOf(' ')+1)*1;//0为ok，1为err

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