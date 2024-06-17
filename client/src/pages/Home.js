import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png"
import {useSelector} from "react-redux";
import {selectorUser} from "../redux/selectors";
const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const basePath = location.pathname === "/";
    const user = useSelector(selectorUser);

    // auth
    // useEffect(() => {
    //     if (user == '')
    //         navigate('/login');
    // }, []);

    return (
        <div className='grid lg: grid-cols-[300px,1fr] h-screen max-h-screen'>
            <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
                <Sidebar></Sidebar>
            </section>
            {/*Message Component*/}
            <section className={`${basePath && "hidden"}`}>
                <Outlet></Outlet>
            </section>

            <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
                <div>
                    <img
                        src={logo}
                        width={220}
                        alt='logo'
                    />
                    <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>
                </div>
            </div>
        </div>
    );
};

export default Home;