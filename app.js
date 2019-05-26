const Koa = require('koa');

//const router=require('koa-router')();

const bodyParser = require('koa-bodyparser');

const controller=require('./controller')

const app=new Koa();
app.use(async (ctx, next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}`); // 打印URL
    //console.log('1');
    await next(); // 调用下一个middleware
});

app.use(bodyParser());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');