"use client"
import React from 'react'
import DeleteAccount from '../_components/DeleteAccount'
import { Tabs } from 'antd'
import WithSuspense from '@/components/WithSuspense'

const Settings = () => {
  return (
    <WithSuspense>
      <Tabs style={{ height: '100%' }} defaultActiveKey="delete_account">
        <Tabs.TabPane tab="Password Reset" key="password_reset">
          <div>Change Password</div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Delete Account" key="delete_account">
          <DeleteAccount />
        </Tabs.TabPane>
      </Tabs>
    </WithSuspense>
  )
}

export default Settings