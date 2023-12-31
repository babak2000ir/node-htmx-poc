//import node
import path from 'node:path';
import { fileURLToPath } from 'node:url';

//import npm
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import Router from 'koa-router';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();
const router = new Router();
app.use(bodyParser());

app.use(async (ctx, next) => {
    // Log the request to the console
    const timeStamp = `${(new Date()).toLocaleDateString('en-GB')} ${(new Date()).toLocaleTimeString('en-GB')}`;
    console.log(`${timeStamp} ${ctx.request.method} '${ctx.request.url}' ${JSON.stringify(ctx.request.body)}`);
    await next();
});

router.get('/api', async (ctx) => {
    ctx.body = "<h1>Hello World!</h1>"
});

router.post('/clicked', async (ctx) => {
    ctx.body = "<h1>:P</h1>"
});

router.post('/mouse_entered', async (ctx) => {
    ctx.body = `<h1>${new Date()}</h1>`
});

router.post('/echo', async (ctx) => {
    ctx.body = `<h4>${JSON.stringify(ctx.request.body)}</h4>`
});

app.use(router.routes());

app.use(serve(path.join(__dirname, '../../client/public')));

app.listen(3000);
console.log("Server is listening on port 3000");
