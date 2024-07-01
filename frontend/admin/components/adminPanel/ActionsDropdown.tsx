import { MoreOutlined } from '@ant-design/icons'
import { Button, Divider, Dropdown, Space } from 'antd'
import React from 'react'

const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
};

const ActionsDropdown = ({items}: any) => {
  return (
    <Dropdown className='text-2xl' menu={{ items }}  dropdownRender={(menu) => (
        <div>
          {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
          <Divider style={{ margin: 0 }} />
          <Space style={{ padding: 8 }}>
            <Button type="primary">Click me!</Button>
          </Space>
        </div>
      )}>
        <MoreOutlined />
    </Dropdown>
  )
}

export default ActionsDropdown