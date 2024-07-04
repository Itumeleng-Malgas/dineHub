"use client"
import { Button, Empty, Form, Input, List, message } from 'antd'
import React, { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'
import axios from 'axios'

const initialData: string[] = [];

const AddMenu = () => {
  const [data, setData] = useState<string[]>(initialData);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { menu: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/addmenu', values);
      if (response.status === 200) {
        setData([...data, values.menu]);
        message.success('Menu added successfully!');
      } else {
        message.error('Failed to add menu.');
      }
    } catch (error) {
      message.error('Failed to add menu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <Form className='flex gap-1 mt-5' onFinish={onFinish}>
            <Form.Item
                name="menu"
                rules={[{ required: true, message: 'Please input the menu item!' }]}
            >
                <Input placeholder="Menu" type="text" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" icon={<IoAddOutline />} loading={loading}>Add Menu</Button>
            </Form.Item>
        </Form>
        <div>
            {data.length > 0 ? (
                <List
                    className='w-1/2'
                    size="small"
                    header={<div>Menu Options</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            ) : (
                <Empty />
            )}
        </div>
    </div>
  )
}

export default AddMenu;