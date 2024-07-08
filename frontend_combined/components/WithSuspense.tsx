import React, { Suspense, ReactNode } from 'react';

type WithSuspenseProps = {
  children: ReactNode;
};

const WithSuspense: React.FC<WithSuspenseProps> = ({ children }) => {
  const fallback = <div className='initial__loading' />;
  const className = 'fade-in-from-top';

  return (
    <Suspense fallback={fallback}>
      <div className={className}>
        {children}
      </div>
    </Suspense>
  );
};

export default WithSuspense;