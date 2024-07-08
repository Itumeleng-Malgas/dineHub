import { DownOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space, Typography } from 'antd';
import { useSession } from 'next-auth/react';
import React from 'react';
import DropdownMenuIcon from './Dropdown';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const items: MenuProps['items'] = [
  {
    label: (
      <Space>
        <LoginOutlined /> Sign in
      </Space>
    ),
    key: 'signin',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <Space>
        <UserAddOutlined /> Register
      </Space>
    ),
    key: '3',
  },
];

const ClientNavbar = () => {
  const { data: session } = useSession();
  const router = useRouter()

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if(key == "signin") {
      router.push('/api/auth/signin')
    }
  };

  return (
    <div className='border-b flex justify-between'>
      <div className='text-4xl font-extrabold my-auto'>
        <Link href={'/'}>DH<span className="font-normal ml-1">DineHub.</span></Link>
      </div>
      <div>
        {session ? (
          <DropdownMenuIcon />
        ) : (
          <>
            <Typography.Link href='/register'>Create an Account</Typography.Link>
            <Dropdown menu={{ items, onClick }}>
              <Space className='ml-2'>
                <DownOutlined />
              </Space>
            </Dropdown>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientNavbar;