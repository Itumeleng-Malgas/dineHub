import { siderMenuItems } from '@/app/menuItems'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface MenuComponentProps {
  setDrawerVisible: (visible: boolean) => void;
}

const MenuComponent = ({ setDrawerVisible }: MenuComponentProps) => {
  const [selectedMenuKey, setSelectedMenuKey] = useState('dashboard');
  const router = useRouter();

  const handleMenuClick = (e: any) => {
    setSelectedMenuKey(e.key);
    setDrawerVisible(false);
    
    router.push(`/admin/${e.key}`);
  };
  
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[selectedMenuKey]}
      defaultOpenKeys={['dashboard']}
      style={{ height: '100%', borderRight: 0 }}
      items={siderMenuItems}
      onClick={handleMenuClick}
    />
  )
}

export default MenuComponent