function getRedisEssionId (sid) {
  return `ssid:${sid}`
}

class RedisSessionStore {
  constructor (client) {
    this.client = client
  }

  // get session data
  async get (sid) {
    console.log('get s >', sid)
    const id = getRedisEssionId(sid)
    const data = await this.client.get(id)
    if (!data) {
      return null
    }
    try {
      const result = JSON.parse(data)
      return result
    } catch (err) {
      console.error(err)
    }
  }

  // set session
  async set (sid, sess, ttl) {
    console.log('set s >', sid)
    const id = getRedisEssionId(sid)
    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000)
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

  // delete session
  async destroy (sid) {
    console.log('delete s >', sid)
    const id = getRedisEssionId(sid)
    await this.client.del(id)
  }
}

module.exports = RedisSessionStore
