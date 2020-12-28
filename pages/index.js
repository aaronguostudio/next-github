import { Button, Icon } from 'antd'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import { request } from '../lib/api'
import Repo from '../components/Repo'

const { publicRuntimeConfig } = getConfig()

const Index = ({ user, data }) => {
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

  console.log('data>>', data)
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
          {data.repos.map(repo => (
            <Repo repo={repo} />
          ))}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
