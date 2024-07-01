import React from 'react'

const FooterComponent = () => {
  return (
    <div className='text-xs text-center md:text-left sm:text-sm'>
      <span className='font-bold'>DineHub</span> © {new Date().getFullYear()} Created by ALX Students
    </div>
  )
}

export default FooterComponent