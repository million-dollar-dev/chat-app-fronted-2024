import React from 'react';

const AuthHeader = ({logoSrc}) => {
  return (
      <header className='flex justify-center items-center py-3 h-20 shadow-md bg-white'>
          <img src={logoSrc}
               alt="logo"
               width={180}
               height={10}
          />
      </header>
  );
};

export default AuthHeader;