import App, { Container } from 'next/app'
import 'antd/dist/antd.css'

import Layout from '../components/Layout'

class MyApp extends App {
  // This will run everytime when switch page
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : null

    return {
      pageProps
    }
  }
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}

export default MyApp
