import { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'next/router'
import { Layout, Icon, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd'
import Container from './Container'
const { Header, Content, Footer } = Layout
import getConfig from 'next/config'
import { logout } from '../store/store'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()

// styles start
// These values won't be recreated after next render
const avatarSize = 40
const githubIconStyle = {
  color: 'white',
  fontSize: 40,
  display: 'block',
  paddingTop: 10,
  marginRight: 20,
}
const footerStyle = {
  textAlign: 'center',
}
// styles end

const MyLayout = ({ children, user, logout, router }) => {
  const [search, setSearch] = useState('')
  const handleSearchChange = useCallback(
    (event) => {
      setSearch(event.target.value)
    },
    [setSearch], // setSearch won't change after next render
  )
  const handleOnSearch = useCallback(() => {
    //
  })

  const handleLogout = useCallback(() => {
    logout()
  }, [logout])

  const userDropDown = (
    <Menu>
      <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner" />}>
          <div className="header-left">
            <div className="logo">
              <Icon type="github" style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
                value={search}
                placeholder="Search repositories"
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user">
              {
                user && user.id ? (
                  <Dropdown overlay={userDropDown}>
                    <Avatar size={avatarSize} src={user.avatar_url} />
                  </Dropdown>
                ) : (
                  <Tooltip title="Click to login">
                    <a href={`/prepare-auth?url=${router.asPath}`}>
                      <Avatar size={avatarSize} icon="user" />
                    </a>
                  </Tooltip>
                )
              }
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Developed by Aaron Guo
      </Footer>

      <style jsx>{`
        .content {
          color: red;
        }
        .header-inner {
          display: flex;
          justify-content: space-between;
        }
        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>

      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>

    </Layout>
  )
}

export default connect(
  state => {
    return {
      user: state.user
    }
  },
  dispatch => {
    return {
      logout: () => dispatch(logout())
    }
  }
)(withRouter(MyLayout))
