"use client"
import { Button, Space, Typography } from 'antd';
import React from 'react';

const DeleteAccount = () => {
  return (
    <div className='w-1/2'>
        <Typography.Paragraph>
            If you delete your DineHub account, all associated information will also
            be deleted. This action cannot be undone. Make sure that you really want
            to do this.
        </Typography.Paragraph>
        <Space>
            <Button danger type='primary' className="btn-danger my-2">
                Delete Account
            </Button>
            <Button type='default' className="btn-danger my-2">
                Be Invisible
            </Button>
        </Space>
    </div>
  );
};

export default DeleteAccount;