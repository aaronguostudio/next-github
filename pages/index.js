import { Button, Icon, Tabs } from 'antd'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import Router, { withRouter } from 'next/router'
import { request } from '../lib/api'
import Repo from '../components/Repo'
import LRU from 'lru-cache'

const { publicRuntimeConfig } = getConfig()
const isServer = typeof window === 'undefined'

// can also use timeout strategy
const cache = new LRU({
  maxAge: 1000 * 30 // miliseconds
})

// We can't cache data here in SSR, because they are stored globally
// and will be cached by in the server side
// let cachedRepos, cachedStars

const Index = ({ user, data, router }) => {

  const tabKey = router.query.key || '1'

  const handleTabChange = activeKey => {
    Router.push(`/?key=${activeKey}`)
  }

  useEffect(() => {
    if(!isServer) {
      data.repos && cache.set('repos', data.repos)
      data.stars && cache.set('stars', data.stars)
    }
  }, [data])

  // return login required
  if (!user || !user.id) {
    return (
      <>
        <div className="root">
          <div>
            <div>Login required</div>
            <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>Login</Button>
          </div>
        </div>
        <style jsx>{`
          .root {
            display: flex;
            justify-content: center;
            margin-top: 5rem;
          }
        `}</style>
      </>
    )
  }

  // return after login
  return (
    <>
      <div className="root">
        <div className="user-info">
          <img src={user.avatar_url} alt="user avatar" className="avatar" />
          <span className="login">{user.login}</span>
          <span className="name">{user.name}</span>
          <span className="bio">{user.bio}</span>
          <span className="email">
            <Icon type="mail" style={{ marginRight: 10 }} />
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </span>
        </div>
        <div>
          <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
            <Tabs.TabPane tab="Repos" key="1">
              {data.repos.map(repo => (
                <Repo key={repo.id} repo={repo} />
              ))}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Stars" key="2">
              {data.stars.map(repo => (
                <Repo key={repo.id} repo={repo} />
              ))}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: flex-start;
          padding: 20px 0;
        }
        .user-info {
          width: 200px;
          margin-left: 40px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .bio {
          font-weight: 800;
          color: #333;
        }
        .email {
          display: flex;
          align-items: center;
        }
        .avatar {
          width: 100%;
          border-radius: 5px;
        }
      `}</style>
    </>
  )
}

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  // update store from the server
  // reduxStore.dispatch(add(100))

  const user = reduxStore.getState().user

  console.log('reduxStore.getState().user', reduxStore.getState().user)

  if (!user || !user.id) {
    return {}
  }

  if (!isServer && cache.get('repos') && cache.get('stars')) return {
    data: {
      repos: cache.get('repos'),
      stars: cache.get('stars')
    }
  }

  const res = await request({
    url: '/user/repos'
  }, ctx.req, ctx.res)

  const stars = await request({
    url: '/user/starred'
  }, ctx.req, ctx.res)

  return {
    data: {
      repos: res.data,
      stars: stars.data
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  // username: state.user.username
})

const mapDispatchToProps = dispatch => ({
  // add: num => dispatch({ type: 'ADD', num }),
  // rename: name => dispatch({ type: 'UPDATE_USERNAME', name })
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Index))
