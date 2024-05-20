import React from "react";
import {IoChatbubbleEllipses} from "react-icons/io5";
import {FaUserPlus} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {BiLogOut} from "react-icons/bi";
import Avatar from "./Avatar";


const Sidebar = () => {
    return (
        <div className='w-full h-full'>
            <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
                <div>
                    <NavLink
                        className={({isActive}) => `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && 'bg-slate-200'}`}
                        title='chat'>
                        <IoChatbubbleEllipses
                            size={25}
                        />
                    </NavLink>

                    <div title='add friend'
                        className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                        <FaUserPlus
                            size={25}
                        />
                    </div>
                </div>

                    <div>
                        <button>
                            <Avatar/>
                        </button>
                        <button title='logout'
                            className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                            <span className='-ml-2'>
                            <BiLogOut size={25}/>
                            </span>
                        </button>

                    </div>

            </div>
        </div>
    )
}

export default Sidebar;