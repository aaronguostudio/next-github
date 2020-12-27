import App from 'next/app'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'
import Router from 'next/router'
import Link from 'next/link'

import Layout from '../components/Layout'
import PageLoading from '../components/PageLoading'

import testHoc from '../lib/with-redux'

// Customize next App
class MyApp extends App {

  state = {
    loading: false
  }

  startLoading = () => {
    this.setState({ loading: true })
  }

  stopLoading = () => {
    this.setState({ loading: false })
  }

  componentDidMount () {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }

  componentWillUnmount () {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  // This will run everytime when switch page, get global data
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
        { this.state.loading ? <PageLoading /> : null }
        <div>
          <Link href='/'>
            <a>Index</a>
          </Link>
          <Link href='/detail'>
            <a>Detail</a>
          </Link>
        </div>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default testHoc(MyApp)
