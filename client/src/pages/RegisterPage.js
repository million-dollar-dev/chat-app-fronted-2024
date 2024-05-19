import React from 'react';

const RegisterPage = () => {
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h3>
          Welcome to Chat App!
        </h3>
        <form>
          <div>
            <label htmlFor='name'>Name :</label>
            <input
                type='text'
                id='name'
                name='name'
                placeholder='Enter your name'
                className='bg-slate-100 px-2 py-1'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;