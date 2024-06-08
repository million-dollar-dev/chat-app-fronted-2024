import React from 'react';
import {Link} from "react-router-dom";
import {FiEye} from "react-icons/fi";

const LoginPage = () => {
    const showPassword = true;
    return (
        <div className='mt-5'>
            <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Welcome back!
                </h2>
                <div className="grid gap-4 mt-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor='name'>Name :</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Enter your name'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label htmlFor='email'>Password :</label>
                        <div className="flex items-center relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                placeholder='Enter your password'
                                className='flex-1 bg-slate-100 px-2 py-1 focus:outline-primary pr-12 rounded'
                                required
                            />
                            <div className="text-xl p-2 absolute top-0.2 right-2">
                                <FiEye/>
                            </div>
                        </div>
                    </div>
                    <button
                        className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 text-white leading-relaxed tracking-wide'
                    >
                        Login
                    </button>
                </div>
                <p className='my-3 text-center'>Don't have an account? <Link to={"/register"}
                                                                             className='hover:text-primary font-semibold'>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;