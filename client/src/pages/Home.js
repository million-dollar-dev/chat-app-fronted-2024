import React, {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png"
import {useSelector} from "react-redux";
import {selectorUser} from "../redux/selectors";
import {useTranslation} from "react-i18next";
import AllUserContext from "../context/AllUserContext";
const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname === "/";
    const user = useSelector(selectorUser);
    const { t } = useTranslation();
    const [allUser, setAllUser] = useState([])
    // auth
    useEffect(() => {
        if (user == '')
            navigate('/login');
    }, []);

    return (
        <div className='grid lg: grid-cols-[300px,1fr] h-screen max-h-screen'>
            <AllUserContext.Provider value={{allUser, setAllUser}}>
                <section className={`bg-gray-900 ${!basePath && "hidden"} lg:block`}>
                    <Sidebar></Sidebar>
                </section>
                {/*Message Component*/}
                <section className={`${basePath && "hidden"}`}>
                    <Outlet></Outlet>
                </section>
            </AllUserContext.Provider>

            <div className={`bg-gray-900  justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
                <div className="flex flex-col items-center">
                    <img
                        src={logo}
                        width={220}
                        alt='logo'
                    />
                    <p className='text-lg mt-2 text-slate-500'>{t('select_user_to_send_message')}</p>
                </div>
            </div>
        </div>
    );
};

export default Home;