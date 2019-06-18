const fs = require('fs');
const unzip = require('unzip2');
const User = require('../User_model');
const path = require('path');

function fn_file_process(user) {
    //解压文件
    //console.log(`准备解压${user.id}.zip`);
    var filepath_zip = path.join(__dirname, `../files/upload/${user.id}.zip`);
    var filepath_folder = path.join(__dirname, `../files/upload/${user.id}`);

    var rs = fs.createReadStream(filepath_zip);
    var ws = unzip.Extract({ path: filepath_folder });
    rs.pipe(ws).on('finish', function () {
        setTimeout(function () {
            var score_arr = fs.readFileSync(filepath_folder + '/score.txt', 'utf-8');
            var score_arr = score_arr.split('\r\n', 3);
            user.score_1 = parseFloat(score_arr[0]);
            user.score_2 = parseFloat(score_arr[1]);
            user.score_3 = parseFloat(score_arr[2]);
            user.score_total = user.score_1 + user.score_2 + user.score_3;
            user.save();
            console.log('update_score');
        },100);
        
    });
    //console.log(`解压完成${user.id}.zip`);
}

module.exports = fn_file_process;