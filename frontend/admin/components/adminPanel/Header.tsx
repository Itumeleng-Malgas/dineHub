"use client";

import AddFormModal from '@/app/(adminPanel)/admin/_components/AddFormModal';
import { useToggle } from '@/context/ToggleContext';
import { LogoutOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, message } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const handleMenuClick: MenuProps['onClick'] = async (e) => {
  await signOut();
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
  const { data: session } = useSession();
  const { toggleState } = useToggle();
  const router = useRouter();

  console.log(session?.user)

  return (
    <div className='flex justify-center md:justify-between items-center gap-1'>
      <div className='flex gap-2 items-center'>
        <Button onClick={() => toggleState()} type="primary" shape='round' icon={<IoAddOutline />}>Add Product</Button>
        <Button onClick={() => router.push('/admin/addmenu')} shape='round' icon={<IoAddOutline />}>Add Menu</Button>
      </div>
      <AddFormModal />
      <div className='whitespace-nowrap'>
        {session && (
          <>
            <span className='hidden md:inline-block sm:text-sx lg:text-lg md:font-bold mr-2'>
              {session.user.email}
            </span>
            <Dropdown menu={menuProps}>
              <Button shape='round' icon={<LogoutOutlined />} />
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
