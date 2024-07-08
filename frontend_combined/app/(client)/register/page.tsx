import React from 'react';
import RegisterComponent from '@/components/RegisterComponent';
import Image from 'next/image';

const RegisterPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden md:flex justify-center items-center bg-gray-200">
        <div className="relative w-full h-full">
          <Image
            src="/baked-chicken-wings-asian-style.jpg"
            alt="Register Image"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white"></div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-white">
        <RegisterComponent />
      </div>
    </div>
  );
};

export default RegisterPage;
