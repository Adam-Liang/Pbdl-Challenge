const fs = require('fs');
const unzip = require('unzip2');
const User = require('../User_model');
const path = require('path');
const fn_iou=require('./fn_iou')

function deleteFolder(path) {//定义一个删除文件夹函数
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function fn_file_process(user) {
    //分数置零
    user.score_total=0;
    //状态更改为文件正在处理
    user.state=1;
    user.save();
    //解压前先删除上次解压的文件夹
    var filepath_torm = path.join(__dirname, `../files/upload/${user.id}`);
    deleteFolder(filepath_torm);
    //解压文件
    //console.log(`准备解压${user.id}.zip`);
    var filepath_zip = path.join(__dirname, `../files/upload/${user.id}.zip`);
    var filepath_folder = path.join(__dirname, `../files/upload/${user.id}`);

    var rs = fs.createReadStream(filepath_zip);
    var ws = unzip.Extract({ path: filepath_folder });
    rs.pipe(ws).on('finish', function () {
        setTimeout(function () {
            fn_iou(user);
            
            /*var score_arr = fs.readFileSync(filepath_folder + '/score.txt', 'utf-8');
            var score_arr = score_arr.split('\r\n', 3);
            user.score_1 = parseFloat(score_arr[0]);
            user.score_2 = parseFloat(score_arr[1]);
            user.score_3 = parseFloat(score_arr[2]);
            user.score_total = user.score_1 + user.score_2 + user.score_3;
            user.save();
            console.log('update_score');*/
        },100);
        
    });
    //console.log(`解压完成${user.id}.zip`);
}

module.exports = fn_file_process;