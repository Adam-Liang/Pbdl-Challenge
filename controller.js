'use strict'
const fs = require("fs");

function addContrallers(router,dir) {

    var files = fs.readdirSync('./'+dir);
    //console.log(files);

    var js_files = files.filter((f) => {
        return f.endsWith(".js");
    });//console.log(js_files);

    for (var f of js_files) {
        console.log(`process controller:${f}...`);

        let mapping = require('./' + dir + '/' + f);
        for (var url in mapping) {
            //console.log(url);
            if (url.startsWith('GET ')) {
                var path = url.substring(4);
                router.get(path, mapping[url]);
                console.log(`register URL mapping: GET ${path}`);
            } else if (url.startsWith('POST ')) {
                var path = url.substring(5);
                router.post(path, mapping[url]);
                console.log(`register URL mapping: POST ${path}`);
            } else {
                console.log(`invalid URL: ${url}`);
            }
        }
    }
}

module.exports = function (dir) {
    let
        actual_dir = dir || 'controllers',
        router = require('koa-router')();
    addContrallers(router, actual_dir);
    return router.routes();
}