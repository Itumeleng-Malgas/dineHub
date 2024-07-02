"use client"
import AddFormModal from '@/app/(adminPanel)/admin/_components/AddFormModal';
import { useToggle } from '@/context/ToggleContext';
import { LogoutOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, message } from 'antd'
import { signOut } from 'next-auth/react';
import React from 'react'
import { IoAddOutline } from 'react-icons/io5';
import AddMenu from './AddMenu';
import { useRouter } from 'next/navigation'

const handleMenuClick: MenuProps['onClick'] = async (e) => {
  await signOut()
  message.success('Successfully logged out');
};

const items: MenuProps['items'] = [
  {
    label: 'Logout',
    key: 'logout',
    icon: <PoweroffOutlined />,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const HeaderComponent = () => {
  const { toggleState } = useToggle();
  const router = useRouter();
  
  return (
    <div className='flex justify-center md:justify-between items-center gap-1'>
      <div className='flex gap-2 items-center'>
        <Button onClick={() => toggleState() } type="primary" shape='round' icon={<IoAddOutline />} >Add Product</Button>
        <Button onClick={() => router.push('/admin/addmenu')} shape='round' icon={<IoAddOutline />}>Add Menu</Button>
      </div>
      <AddFormModal />
      <div className='whitespace-nowrap'>
        <span className='sm:text-sx lg:text-lg md:font-bold mr-2'>Itumeleng&apos;s Dinner</span>
        <Dropdown  menu={menuProps}>
          <Button shape='round' icon={<LogoutOutlined />} />
        </Dropdown>
      </div>
    </div>
  )
}

export default HeaderComponent