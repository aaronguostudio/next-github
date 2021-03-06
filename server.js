const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')
const koaBody = require('koa-body')

const auth = require('./server/auth')
const api = require('./server/api')

const RedisSessionStore = require('./server/session-store')

const dev = process.env.NODE_ENV !== 'production'

// init next middleware
const app = next({ dev })
const handle = app.getRequestHandler()

// init redis client
const redis = new Redis()

// make sure next is rendered
app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  // keys for encrypt the session
  server.keys = ['Aaron Guo Learn']
  const SESSION_CONFIG = {
    key: 'id', // set the key for cookie
    maxAge: 60 * 60 * 1000, // 1 hour
    store: new RedisSessionStore(redis),
  }

  server.use(koaBody())

  server.use(session(SESSION_CONFIG, server))

  // process github request
  auth(server)
  api(server)

  router.get('/set/user', async ctx => {
    ctx.session.user = {
      name: 'aa'
    }
    ctx.body = 'su'
  })

  router.get('/a/:id', async ctx => {
    const id = ctx.params.id

    console.log('>id', id)

    app.render(ctx.req, ctx.res, '/a', { id })

    // await handle(ctx.req, ctx.res, {
    //   pathname: '/a',
    //   query: {
    //     a: '1212'
    //   }
    // })
    ctx.respond = false // turn off koa internal body process, will handle manually by nextjs
  })

  router.get('/api/user/info', async ctx => {
    const user = ctx.session.userInfo
    if (!user) {
      ctx.status = 401
      ctx.body = 'Need Login'
    } else {
      ctx.body = user
      ctx.set('Content-Type', 'application/json')
    }
  })

  server.use(router.routes())

  // use next to handle requests
  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  // server.use(async (ctx, next) => {
  //   ctx.res.statusCode = 200
  //   await next()
  // })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })

  // ctx.body
})
