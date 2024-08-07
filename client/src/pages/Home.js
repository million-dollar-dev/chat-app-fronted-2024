import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png"
import {useSelector} from "react-redux";
import {selectorRecode, selectorUser} from "../redux/selectors";
import {useTranslation} from "react-i18next";
import AllUserContext from "../context/AllUserContext";
import websocketService from "../services/websocket";
const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname === "/";
    const user = useSelector(selectorUser);
    const recode = useSelector(selectorRecode);
    const { t } = useTranslation();
    const [allUser, setAllUser] = useState([])
    // auth
    useEffect(() => {
        if (user === '' && recode === '')
            navigate('/login');
    }, []);

    useEffect(() => {
        const reLoginCallback = (response) => {
            if (response.event === 'AUTH' && response.status === 'error' && response.mes === 'User not Login') {
                if (user && recode) {
                    websocketService.send({
                        "action": "onchat",
                        "data": {
                            "event": "RE_LOGIN",
                            "data": {
                                "user": user,
                                "code": recode
                            }
                        }
                    })
                }
            }
        };
        websocketService.on("RE_LOGIN", reLoginCallback);
    }, [])

    return (
        <div className='grid lg: grid-cols-[360px,1fr] h-screen max-h-screen'>
            <AllUserContext.Provider value={{allUser, setAllUser}}>
                <section className={`bg-primary ${!basePath && "hidden"} lg:block`}>
                    <Sidebar></Sidebar>
                </section>
                {/*Message Component*/}
                <section className={`${basePath && "hidden"}`}>
                    <Outlet></Outlet>
                </section>
            </AllUserContext.Provider>

            <div className={`bg-primary  justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
                <div className="flex flex-col items-center">
                    <img
                        src={logo}
                        width={220}
                        alt='logo'
                    />
                    <p className='text-lg mt-2 text-headlineColor'>{t('select_user_to_send_message')}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;