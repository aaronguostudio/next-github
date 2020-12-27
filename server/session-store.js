const scope = 'ssid'

function getRedisEssionId (sid) {
  return `${scope}:${sid}`
}

class RedisSessionStore {
  constructor (client) {
    this.client = client
  }

  // get session data from redis
  async get (sid) {
    console.log('get session', sid)
    const id = getRedisEssionId(sid)
    const data = await this.client.get(id)
    if (!data) return null
    try {
      return JSON.parse(data)
    } catch (err) {
      console.error(err)
    }
  }

  // set session from redis
  async set (sid, sess, ttl) {
    console.log('set session', sid)
    const id = getRedisEssionId(sid)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000) // parse to seconds
    }

    try {
      const sessStr = JSON.stringify(sess)
      if (ttl) {
        await this.client.setex(id, ttl, sessStr)
      } else {
        await this.client.set(id, sessStr)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // delete session from redis
  async destroy (sid) {
    console.log('delete s', sid)
    const id = getRedisEssionId(sid)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore
