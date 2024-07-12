import React, {useContext, useEffect, useState} from "react";
import {IoChatbubbleEllipses} from "react-icons/io5";
import {FaUserPlus} from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";
import {BiLogOut} from "react-icons/bi";
import Avatar from "./Avatar";
import {FiArrowUpLeft} from "react-icons/fi";
import SearchUser from "./SearchUser";
import {IoSettingsOutline} from "react-icons/io5";
import SettingPopup from "./SettingPopup";
import {useDispatch, useSelector} from "react-redux";
import {selectorUser} from "../redux/selectors";
import { logout } from "../redux/actions";
import websocketService from "../services/websocket";
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";
import AllUserContext from "../context/AllUserContext"
import { clearTitleNotification } from "../utils/notify";

const Sidebar = () => {
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const {allUser, setAllUser} = useContext(AllUserContext);
    const user = useSelector(selectorUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation();

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    const handleClose = () => {
        setShowPopup(false);
    };
    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        websocketService.send({
            "action": "onchat",
            "data": {
                "event": "LOGOUT"                
            }
        })
        dispatch(logout())
        navigate('/login')
        websocketService.connect('ws://140.238.54.136:8080/chat/chat');      
    }

    const handleGetAllUser = () => {
        websocketService.send({
            "action": "onchat",
            "data": {
                "event": "GET_USER_LIST"                
            }
        })
        websocketService.socket.onmessage = (message) => {
            const response = JSON.parse(message.data);
            console.log(response);
            if (response.event === 'GET_USER_LIST' && response.status === 'success') {
                setAllUser(response.data)         
            }
            if (response.event === 'SEND_CHAT' && response.status === 'success')
                handleGetAllUser()
        }
    }

    const hanleClickUserCard = (username) => {
        const updateList = allUser.map(item => 
            item.name === username ? {...item, isNewMessage: false} : item
        )
        clearTitleNotification()
        setAllUser(updateList)
    }

    useEffect(() => {
        if (user)
            handleGetAllUser()
    }, [user])

    const SidebarIcon = ({icon, text = 'tooltip 💡'}) => (
        <div className="sidebar-icon group">
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
        </div>
    );

    const Divider = () => <hr className="sidebar-hr" />;
    return (
        <div className='w-full h-full grid grid-cols-[48px,1fr] bg-gray'>
            <div
                className='bg-gray-900 w-15 h-full rounded-tr-lg rounded-br-lg  text-slate-600 flex flex-col justify-between '>
                <div>
                    <NavLink
                        className={({isActive}) => ` ${isActive && 'bg-gray-900'}`}
                        title='chat'>
                        <SidebarIcon icon={<IoChatbubbleEllipses size="25" />} />
                    </NavLink>
                    <Divider />
                    <div title='add friend'
                         onClick={() => setOpenSearchUser(true)}>
                        <SidebarIcon icon={<FaUserPlus size="25" />} />
                    </div>
                    {/*button setting*/}
                    <button title='setting' onClick={togglePopup}>
                        <SidebarIcon icon={<IoSettingsOutline size="25" />} />
                    </button>
                    <Divider />
                    <button title='logout'
                            onClick={handleLogout}
                    >
                        <SidebarIcon icon={<BiLogOut size="25" />} />
                    </button>

                </div>

                <div className='flex flex-col items-center'>
                    <button className='mx-auto'>
                        <Avatar
                            width={40}
                            height={40}
                            username={user}
                        />
                    </button>
                </div>
            </div>
            <div className='w-full bg-gray-800'>
                <div className='h-16 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-slate-300'>Message</h2>
                </div>
                <div className='bg-slate-700 p-[0.5px]'></div>
                <div className=' h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                    {
                        allUser.length === 0 && (
                            <div className='mt-12'>
                                <div className='flex justify-center items-center my-4 text-slate-300'>
                                    <FiArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <p className='text-lg text-center text-slate-400'>{t('explore_users_to_start_a_conversation_with.')}
                                </p>
                            </div>
                        )
                    }
                    {
                        allUser
                            .filter(item => item.name !== user)
                            .map((item, index) => {
                            return (
                                <NavLink 
                                    key={index} 
                                    to={"/" + item.name}
                                    onClick={() => hanleClickUserCard(item.name)} 
                                    className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-600 cursor-pointer'>
                                    <div>
                                        <Avatar                                        
                                            username={item.name}
                                            width={40}
                                            height={40}
                                        />    
                                    </div>
                                    <div>
                                        <h3 className='text-ellipsis text-slate-200 line-clamp-1 font-semibold text-base'>{item.name}</h3>
                                        <div className='text-slate-200 text-xs flex items-center gap-1'>
                                            <p className='text-ellipsis line-clamp-1'>{item.actionTime}</p>
                                        </div>
                                    </div>
                                    {
                                        item.isNewMessage && (
                                            <span class="ml-10 relative flex h-3 w-3">
                                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                <span span class="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                                            </span>
                                        )
                                    }
                                    
                                </NavLink>
                            )
                        })
                    }
                </div>
            </div>
            {/**search user */}
            {
                openSearchUser && (
                    <SearchUser onClose={() => setOpenSearchUser(false)}/>
                )
            }
            {showPopup && <SettingPopup handleClose={handleClose} />}
        </div>
    )
}

export default Sidebar;