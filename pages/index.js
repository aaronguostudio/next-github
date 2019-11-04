import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

export default () => {
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
      <div className="test">Index</div>
    </>
  )
}
