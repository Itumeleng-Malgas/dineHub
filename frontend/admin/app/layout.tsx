import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

<<<<<<< HEAD
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import theme from '@/theme/themeConfig';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DineHub | Merchant Portal",
  description: "Get your restaurant online with DineHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </body>
      </html>
    </ConfigProvider>
  );
}
