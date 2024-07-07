"use client"
import React from 'react'
import DeleteAccount from '../_components/DeleteAccount'
import { Tabs } from 'antd'
import WithSuspense from '@/components/WithSuspense'
import PasswordResetForm from '@/components/adminPanel/PasswordResetForm'

const Settings = () => {
  return (
    <WithSuspense>
      <Tabs style={{ height: '100%' }} defaultActiveKey="password_reset">
        <Tabs.TabPane tab="Password Reset" key="password_reset">
          <PasswordResetForm />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Delete Account" key="delete_account">
          <DeleteAccount />
        </Tabs.TabPane>
      </Tabs>
    </WithSuspense>
  )
}

export default Settings