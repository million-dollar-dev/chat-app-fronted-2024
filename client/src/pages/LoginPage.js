import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import websocketService from "../services/websocket";
import { useDispatch } from "react-redux";
import {setRecode, setUser} from "../redux/actions";
import {useTranslation} from "react-i18next";
import eventManager from "../services/eventManager";

const LoginPage = () => {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

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

        const loginCallback = (response) => {
            if (response.status === "success" && response.event === "LOGIN") {
                dispatch(setUser(username));
                dispatch(setRecode(response.data.RE_LOGIN_CODE));
                navigate("/");
                setUsername("");
                setPassword("");
                websocketService.off("LOGIN", loginCallback)
                toast.success(t("login_successfully"));
            } else {
                setPassword("");
                toast.error(response.mes);
            }
        };
        websocketService.on("LOGIN", loginCallback);
        websocketService.send(loginData);
    };

    

    return (
        <div className='mt-5'>
            <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {t('welcome_back')}
                </h2>
                <div className="grid gap-4 mt-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor='name'>{t('username')}</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            required
                            placeholder={t('enter_your_username')}
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                    </div>
                    <div className="flex flex-col gap-1 ">
                        <label htmlFor='email'>{t('password')}</label>
                        <div className="flex items-center relative">
                            <input
                                type={visible ? 'text' : 'password'}
                                id='password'
                                name='password'
                                required
                                placeholder={t('enter_your_password')}
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
                        className='bg-btnColor text-btnTextColor text-lg px-4 py-1 hover:bg-secondary rounded mt-2 leading-relaxed tracking-wide'
                        onClick={handleLogin}
                    >
                        {t('login')}
                    </button>
                </div>
                <p className='my-3 text-center'>{t('dont_have_an_account')}<Link to={"/register"}
                                                                             className='hover:text-btnColor font-semibold'>{t('register')}</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;