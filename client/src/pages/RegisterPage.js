import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast";
import websocketService from "../services/websocket";
import {useDispatch, useSelector} from "react-redux";
import {setCode, setRecode, setUser} from "../redux/actions";
import {useTranslation} from "react-i18next";
import {selectorRecode} from "../redux/selectors";

const RegisterPage = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const dispatch = useDispatch()
    const {t} = useTranslation();

    const handleRegister = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (username.length === 0 || password.length === 0 || repeatPassword.length === 0) {
            toast.error(t('please_fill_all_form'))
            return
        }

        if (!(password == repeatPassword)) {
            toast.error(t('make_sure_passwords_match'))
            return
        }

        const registerData = {
            "action": "onchat",
            "data": {
                "event": "REGISTER",
                "data": {
                    "user": username,
                    "pass": password
                }
            }
        }

        websocketService.send(registerData);

        const registerCallback = (response) => {
            if (response.status === "success" && response.event === "REGISTER") {
                websocketService.off("REGISTER", registerCallback);
                setUsername("");
                setPassword("");
                setRepeatPassword("");
                navigate("/login");
                toast.success(t("register_successfully"));

            } else {
                setPassword("");
                setRepeatPassword("");
                toast.error(response.mes);
            }
        };
        websocketService.on("REGISTER", registerCallback);
    }

    return (
        <div className='mt-5'>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4 mx-auto'>
                <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                    {t('register')}
                </h2>
                <h3 className="mt-2 text-center text-xl font-extrabold text-gray-900">
                    {t('welcome_to_chat_app')}
                </h3>
                {/*<pre>{JSON.stringify(data, undefined, 2)}</pre>*/}
                <div className="grid gap-4 mt-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor='name'>{t('username')}</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            placeholder={t('enter_your_username')}
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor='email'>{t('password')}</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            placeholder={t('enter_your_password')}
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor='email'>{t('repeat_password')}</label>
                        <input
                            type='password'
                            id='repeatPassword'
                            name='reatPassword'
                            placeholder={t('repeat_your_password')}
                            className='bg-slate-100 px-2 py-1 focus:outline-primary'
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        className='bg-btnColor text-btnTextColor text-lg px-4 py-1 hover:bg-secondary rounded mt-2 text-white leading-relaxed tracking-wide'
                        onClick={handleRegister}
                    >
                        {t('register')}
                    </button>
                </div>
                <p className='my-3 text-center'>{t('already_have_account')} <Link to={"/login"}
                                                                                  className='hover:text-btnColor font-semibold'>{t('login')} </Link>
                </p>


            </div>
        </div>
    );
};

export default RegisterPage;