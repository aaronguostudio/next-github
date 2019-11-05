import App from 'next/app'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import Layout from '../components/Layout'

import testHoc from '../lib/with-redux'

class MyApp extends App {
  // This will run everytime when switch page
  static async getInitialProps(ctx) {
    const { Component } = ctx
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : null

    return {
      pageProps
    }
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Provider store={reduxStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default testHoc(MyApp)
