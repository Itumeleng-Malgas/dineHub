import DashboardComponent from '@/components/adminPanel/Dashboard';
import React, { Suspense } from 'react';
import '@/styles/animations.css';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className='initial__loading'/>}>
      <div className="fade-in-from-top">  {/* Apply the animation class */}
        <DashboardComponent />
      </div>
    </Suspense>
  );
}