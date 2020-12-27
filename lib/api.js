const axios = require('axios')
const github_base_url = 'https://api.github.com'

const isServer = typeof window === 'undefined'

const requestGithub = (method, url, data, headers) => {
  return axios({
    method,
    url: `${github_base_url}${url}`,
    headers,
    data
  })
}

const request = async ({ method = 'GET', url, data, headers }, req, res) => {
  if (!url) throw Error('url must be provided')

  // request github server
  if (isServer) {
    const session = req.session
    const githubAuth = session.githubAuth || {}
    const token = githubAuth && githubAuth.access_token
    const headers = {}
    if (token) {
      headers['Authorization'] = `${githubAuth.token_type} ${token}`
    }

    return await requestGithub(method, url, data, headers)
  } else {
    // request proxy server
    return await axios({
      method,
      url: `/github${url}`,
      data
    })
  }
}

module.exports = {
  requestGithub,
  request
}
