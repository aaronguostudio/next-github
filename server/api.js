const github_base_url = 'http://api.github.com'
const axios = require('axios')

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const path = ctx.path

    if (path.startsWith('/github/')) {
      const githubAuth = ctx.session.githubAuth
      const githubPath = `${github_base_url}${ctx.url.replace('/github/', '/')}`

      const token = githubAuth && githubAuth.access_token

      let headers = {}
      if (token) {
        headers['Authorization'] = `${githubAuth.token_type} ${token}`
      }

      ctx.set('Content-Type', 'application/json')
      try {
        const res = await axios({
          url: `${githubPath}`,
          headers
        })

        if (res.status === 200) {
          ctx.body = res.data
        } else {
          ctx.status = res.status
          ctx.body = { success: false }
        }
      } catch (err) {
        ctx.status = 500
        ctx.body = { success: false }
        console.log('err', err)
      }
    } else {
      await next()
    }
  })
}
