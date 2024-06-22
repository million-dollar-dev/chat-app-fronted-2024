import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import websocketService from "../services/websocket";
import { useDispatch } from "react-redux";
import {setUser} from "../redux/actions";

const LoginPage = () => {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const loginData = {
            "action": "onchat",
            "data": {
                "event": "LOGIN",
                "data": {
                    "user": username,
                    "pass": password
                }
            }
        };

        websocketService.send(loginData);

        websocketService.socket.onmessage = (message) => {
            const response = JSON.parse(message.data);
            console.log(response);
            if (response.event === 'LOGIN') {
                if (response.status === 'success' ) {
                    dispatch(setUser(username));
                    navigate('/');
                    setUsername('');
                    setPassword('');
                    toast.success('Login successfully');
                } else {
                    setPassword('');
                    toast.error(response.mes);
                }           
            } else {
                toast(response.data)
            }
                 
        };
    };

    

    return (
        <div className='mt-5'>
            <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Welcome back!
                </h2>
                <div className="grid gap-4 mt-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor='name'>Username :</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            required
                            placeholder='Enter your username'
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label htmlFor='email'>Password :</label>
                        <div className="flex items-center relative">
                            <input
                                type={visible ? 'text' : 'password'}
                                id='password'
                                name='password'
                                required
                                placeholder='Enter your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='flex-1 bg-slate-100 px-2 py-1 focus:outline-primary pr-12 rounded'
                            />
                            <button
                                className="text-xl p-2 absolute top-0.2 right-2"
                                onClick={() => setVisible(!visible)}
                            >
                                {visible ? (<FaRegEyeSlash/>) : (<FaRegEye/>)}
                            </button>
                        </div>
                    </div>
                    <button
                        className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 text-white leading-relaxed tracking-wide'
                        onClick={handleLogin}
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