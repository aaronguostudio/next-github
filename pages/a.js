import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const Comp = dynamic(import('../components/LazyComponent'))

const Title = styled.h1`
  color: blue;
  font-size: 40px;
`

const A = ({ name, time }) => {
  const router = useRouter()
  return (
    <>
      <Title>
        This is {name}, {time}
      </Title>
      <Comp />
      <div>lorem, {router.query.id}</div>
      <span>{router.query.id}</span>
      <style jsx>
        {`
          div {
            color: green;
          }
        `}
      </style>
    </>
  )
}

A.getInitialProps = async ctx => {
  // lazy loading
  const moment = await import('moment')

  return {
    name: 'Aaron Guo',
    time: moment.default(Date.now() - 60 * 1000).fromNow()
  }
}

export default A
