"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ToggleProvider } from '@/context/toggleContext';
import { Layout } from 'antd';
import ClientHeader from './Header';
import ClientFooter from './Footer';
import ClientContent from './ClientContent';

const { Header, Footer, Sider, Content } = Layout;

function ClientLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
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
    <Layout style={{ minHeight: '100vh' }}>
        <Layout.Header style={{backgroundColor: "#fff", zIndex: "999"}} className='sticky top-0 bg-white'><ClientHeader/></Layout.Header>
        <Content className="mx-12 my-4">
            {children}
        </Content>
        <Layout.Footer><ClientFooter/></Layout.Footer>
    </Layout>
  );
}

export default ClientLayout