import DashboardComponent from '@/components/adminPanel/Dashboard';
import React, { Suspense } from 'react';
import '@/styles/animations.css';
import WithSuspense from '@/components/WithSuspense';

export default function DashboardPage() {
  return (
    <WithSuspense><DashboardComponent /></WithSuspense>
  );
}