const Koa = require('koa');
const path = require('path');

//const router=require('koa-router')();
//const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');

const controller=require('./controller')

const app = new Koa();




app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.href}`); // 打印URL
    //console.log('1');
    await next(); // 调用下一个middleware
});

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(koaBody({
    multipart: true,
    formidable: {
        //uploadDir:path.join(__dirname,'/files/upload/'),
        maxFileSize: 1000 * 1024 * 1024,
        keepExtensions: true,
        //onFileBegin: (name, file) => {
        //    file.path = `${__dirname}/files/upload/${file.name}`;
        //}
    }
}));

const templating = require("./templating");
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');