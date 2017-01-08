const Koa = require('koa');
const koaStatic = require('@server/static');

const app = new Koa();
app.use(koaStatic('./test'));

app.listen(3030, () => {
    console.log('server start , port : 3030');
});
