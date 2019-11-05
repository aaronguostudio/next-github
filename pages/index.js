import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { connect } from 'react-redux'

import { add } from '../store/store'

const Index = ({ counter, username, rename, add }) => {
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

  return (
    <>
      <div className="test">{counter}</div>
      <div className="test">{username}</div>
      <input value={username} onChange={e => rename(e.target.value)} />
      <Button onClick={() => add()}>Add</Button>
    </>
  )
}

Index.getInitialProps = async ({ reduxStore }) => {
  // update store from the server
  reduxStore.dispatch(add(100))
}

const mapStateToProps = state => ({
  counter: state.counter.count,
  username: state.user.username
})

const mapDispatchToProps = dispatch => ({
  add: num => dispatch({ type: 'ADD', num }),
  rename: name => dispatch({ type: 'UPDATE_USERNAME', name })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
