"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { ReactNode } from "react";

export function PageHeader({ children }: { children: ReactNode }) {
  const path = typeof children === 'string' ? children : '';

  // Split the path by '/' and filter out any empty segments
  const segments = path.split('/').filter(segment => segment);

  // Create breadcrumb items with titles, first item being 'Home'
  const breadcrumbItems = [
    { title: 'Home' },
    ...segments.map((segment, index) => {
      const pageTitle = segment.charAt(0).toUpperCase() + segment.slice(1);
      const href = segment.toLowerCase() === 'admin' ? '/admin/dashboard' : `${segment}`;

      if (index === segments.length - 1) {
        return { title: pageTitle }; // Last item is not an anchor
      }
      return { title: <Link href={href}>{pageTitle}</Link> };
    })
  ];

  return (
    <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 10 }} />
  );
}