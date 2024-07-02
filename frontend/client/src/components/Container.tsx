import React from 'react';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className='max-w-[1920px] w-full mx-auto xl:px-20 px-4 py-4'>
      {children}
    </div>
  );
};

export default Container;