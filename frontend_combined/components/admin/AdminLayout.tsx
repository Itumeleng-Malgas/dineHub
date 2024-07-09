"use client";
import React, { useEffect, useState } from 'react';
import { Drawer, Layout, FloatButton } from 'antd';
import { RightOutlined } from '@ant-design/icons';

import { usePathname } from 'next/navigation';
import { ToggleProvider } from '@/context/toggleContext';
import AdminFooter from './AdminFooter';
import AdminMenu from './Menu';
import AdminHeader from './AdminHeader';
import { AdminPageHeader } from './AdminPageHeader';

const { Header, Footer, Sider, Content } = Layout;

function AdminLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  // Set isMobile state based on window.innerWidth after the component mounts
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set collapsed to true if the device is mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  return (
    <Layout style={{ minHeight: '100vh', background: "#fff" }}>
      <Sider
        style={{
          display: isMobile ? 'none' : 'block',
          position: 'fixed',
          top: 0,
          bottom: 0,
          overflow: 'auto',
        }}
        className='border-r-[1px]'
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
      <AdminMenu setDrawerVisible={setDrawerVisible} />
      </Sider>
      <ToggleProvider>
        <Layout className='transition-all' style={{ marginLeft: isMobile ? 0 : collapsed ? '80px' : '200px' }}>
        <Header className='border-l-[0px] shadow sticky top-0 z-10'>
          <AdminHeader />
        </Header>
        <Content className='p-2 md:p-5'>
          <AdminPageHeader>{pathname}</AdminPageHeader>
          {children}
        </Content>
        <Footer><AdminFooter /></Footer>
      </Layout>
      </ToggleProvider>
      <FloatButton
        icon={<RightOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{
          display: isMobile ? 'block' : 'none',
          position: 'fixed',
          bottom: 16,
          left: 16,
          zIndex: 1000,
        }}
      />
      <Drawer
        title="Menu"
        placement="left"
        open={drawerVisible}
        closable
        onClose={() => setDrawerVisible(false)}
      >
        <AdminMenu setDrawerVisible={setDrawerVisible} />
      </Drawer>
    </Layout>
  );
}

export default AdminLayout