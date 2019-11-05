import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Button, Layout, Icon, Input, Avatar } from 'antd'

import Container from './Container'

const { Header, Content, Footer } = Layout

export default ({ children }) => {
  const [search, setSearch] = useState('')
  const handleSearchChange = useCallback(
    event => {
      setSearch(event.target.value)
    },
    [setSearch],
  )
  const handleOnSearch = () => {

  }

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
              <Avatar size={40} icon="user" />
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
