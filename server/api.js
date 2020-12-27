const axios = require('axios')
const { requestGithub } = require('../lib/api')

module.exports = (server) => {
  server.use(async (ctx, next) => {

    if (ctx.path.startsWith('/github/')) {
      try {
        const url = ctx.url
        const method = ctx.method
        const githubAuth = ctx.session && ctx.session.githubAuth
        const token = githubAuth && githubAuth.access_token
        const headers = {}

        if (token) {
          headers['Authorization'] = `${githubAuth.token_type} ${token}`
        }

        const res = await requestGithub(
          method,
          url.replace('/github/', '/'),
          ctx.request.body || {},
          headers
        )
        ctx.status = res.status

        if (res.status === 200) {
          ctx.body = res.data
        } else {
          ctx.body = { success: false }
        }
      } catch (err) {
        ctx.status = err.response.status
        ctx.body = { success: false }
        console.log('err',JSON.stringify(err.response.data.errors))
      }
    } else {
      await next()
    }
  })
}
