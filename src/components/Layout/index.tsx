import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Layout, theme } from 'antd';
import Breadcrumb from '@/components/Layout/Breadcrumb'
import UserInfo from '@/components/Layout/UserInfo'
import Menu from '@/components/Layout/Menu'
import Tabs from '@/components/Layout/Tags'
import 'reset-css'
const { Header, Content, Footer, Sider } = Layout;
import { Outlet } from 'react-router-dom'
import FooterContent from '@/components/Layout/Footer'

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{
          margin: '0 16px',
          background: colorBgContainer,
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #ccc'
        }}>
          <Breadcrumb />
          <UserInfo />
        </Header>
        <Tabs/>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <FooterContent />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;