import React, { useState } from "react";
import {IoChatbubbleEllipses} from "react-icons/io5";
import {FaUserPlus} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {BiLogOut} from "react-icons/bi";
import Avatar from "./Avatar";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import { IoSettingsOutline } from "react-icons/io5";


const Sidebar = () => {
    const [openSearchUser,setOpenSearchUser] = useState(false)
    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
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
                        onClick={() => setOpenSearchUser(true)}
                        className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                        <FaUserPlus
                            size={25}
                        />
                    </div>
                </div>

                <div>
                    <button className='mx-auto'>
                        <Avatar
                            width={40}
                            height={40}
                            name={"ThuyThuy"}
                        />
                    </button>
                    {/*button setting*/}
                    <button title='setting'
                            className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                            <span className='-ml-2'>
                            <IoSettingsOutline  size={25}/>
                            </span>
                    </button>

                    <button title='logout'
                            className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded'>
                            <span className='-ml-2'>
                            <BiLogOut size={25}/>
                            </span>
                    </button>
                </div>
            </div>
            <div className='w-full '>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-slate-800'>Message</h2>
                </div>
                <div className='bg-slate-200 p-[0.5px]'></div>
                <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                    <div className='mt-12'>
                        <div className='flex justify-center items-center my-4 text-slate-500'>
                            <FiArrowUpLeft
                                size={50}
                            />
                        </div>
                        <p className='text-lg text-center text-slate-400'>Explore users to start a conversation
                            with.</p>
                    </div>
                </div>
            </div>
            {/**search user */}
            {
                openSearchUser && (
                    <SearchUser onClose={()=>setOpenSearchUser(false)}/>
                )
            }
        </div>
    )
}

export default Sidebar;