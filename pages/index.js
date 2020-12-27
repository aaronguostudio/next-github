import Router from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import { request } from '../lib/api'

const { publicRuntimeConfig } = getConfig()

const Index = ({ counter, username, rename }) => {
  function handleClick() {
    Router.push(
      {
        pathname: '/test/b',
        query: {
          id: 12
        }
      },
      '/test/b/12'
    )
  }

  // useEffect(() => {
  //   axios.get('/api/user/info')
  //     .then(res => console.log('>>>', res))
  // }, [])

  return (
    <>
      <div className="test">{counter}</div>
      <div className="test">{username}</div>
      <input value={username} onChange={e => rename(e.target.value)} />
      <Button>Add</Button>
      <a href={publicRuntimeConfig.OAUTH_URL}>Login</a>
    </>
  )
}

Index.getInitialProps = async ({ ctx }) => {
  // update store from the server
  // reduxStore.dispatch(add(100))

  const res = await request({
    url: '/search/repositories?q=react'
  }, ctx.req, ctx.res)

  return {
    data: res.data
  }
}

const mapStateToProps = state => ({
  // counter: state.counter.count,
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
