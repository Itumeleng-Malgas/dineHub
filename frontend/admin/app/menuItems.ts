import { BarChartOutlined, DashboardOutlined, ProductOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";

export const siderMenuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: React.createElement(DashboardOutlined),
      label: 'Dashboard',
    },
    {
      key: 'account',
      icon: React.createElement(UserOutlined),
      label: 'Account',
      children: [
        { key: 'profile', label: 'Profile' },
      ],
    },
    {
      key: 'products',
      icon: React.createElement(ProductOutlined),
      label: 'Products Management'
    },
    {
      key: 'analytics',
      icon: React.createElement(BarChartOutlined),
      label: 'Analytics',
    },
    {
      key: 'settings',
      icon: React.createElement(SettingOutlined),
      label: 'Account Settings',
    },
  ];