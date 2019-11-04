import App from 'next/app'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import Layout from '../components/Layout'

import store from '../store/store'

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
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default MyApp
