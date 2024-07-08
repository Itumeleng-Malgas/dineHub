// theme/themeConfig.ts
import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: '#1890ff',
    fontFamily: 'Lato, sans-serif',
    colorLink: '#1e1e1e',
    colorBorder: '#BBBCBB'
    },
  components: {
    Layout: {
      colorBgLayout: '#fff',
      headerBg: '#fff',
      footerBg: '#f0f2f5',
      siderBg: '#fff',
      triggerBg: '#fff',
      triggerColor: '#000',
      footerPadding: '10px 50px',
    },
    Menu: {
      //itemBg: '#f0f2f5',
      itemSelectedBg: '#d7e4fa',
    },
    Button: {
      colorPrimary: '#04BEFE',
      colorPrimaryHover: '#6253E1',
      colorPrimaryActive: '#04BEFE',
    },
    Divider: {
      colorBorder: '#BBBCBB',
    },
    Drawer: {
      padding: 10,
    },
  },
};

export default theme;