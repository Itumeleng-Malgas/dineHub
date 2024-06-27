import React, { ReactNode } from 'react'


const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    // the children will wrap our sign-up/in
    <div className='h-sceen flex justify-center items-center justify-center'>
      {children} 
    </div>
  )

}
export default AuthLayout;