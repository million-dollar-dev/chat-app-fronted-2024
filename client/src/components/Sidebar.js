import React, {useContext, useEffect, useState} from "react";
import {IoChatbubbleEllipses, IoPersonAdd, IoSettingsOutline} from "react-icons/io5";
import {FaUserPlus} from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";
import {BiLogOut} from "react-icons/bi";
import Avatar from "./Avatar";
import {FiArrowUpLeft} from "react-icons/fi";
import SearchUser from "./SearchUser";
import SettingPopup from "./SettingPopup";
import {useDispatch, useSelector} from "react-redux";
import {selectorUser} from "../redux/selectors";
import {logout} from "../redux/actions";
import websocketService from "../services/websocket";
import {useTranslation} from "react-i18next";
import AllUserContext from "../context/AllUserContext"
import {clearTitleNotification} from "../utils/notify";
import {RiLogoutBoxFill} from "react-icons/ri";
import {IoIosSettings, IoMdPersonAdd} from "react-icons/io";
import {HiUserGroup} from "react-icons/hi";
import {MdGroupAdd} from "react-icons/md";
import GroupPopup from "./GroupPopup";

const Sidebar = () => {
    const [openSearchUser, setOpenSearchUser] = useState(false);
    const [openCreateGroup, setOpenCreateGroup] = useState(false);
    const [openJoinGroup, setOpenJoinGroup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const {allUser, setAllUser} = useContext(AllUserContext);
    const user = useSelector(selectorUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {t} = useTranslation();

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

    const handleClickUserCard = (username) => {
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

    const Divider = () => <hr className="sidebar-hr"/>;

    return (
        <div className='w-full h-full grid grid-cols-[70px,1fr]'>
            <div className='bg-btnColor w-16 h-full flex flex-col shadow-md'>
                <div className='sidebar-icon flex flex-col items-center'>
                    <button className='mx-auto'>
                        <Avatar
                            width={40}
                            height={40}
                            username={user}
                        />
                    </button>
                </div>
                <Divider/>
                <NavLink
                    title='chat'>
                    <SidebarIcon icon={<IoChatbubbleEllipses size="25"/>} text='Messages'/>
                </NavLink>
                <div title='add friend'
                     onClick={() => setOpenSearchUser(true)}>
                    <SidebarIcon icon={<FaUserPlus size="25"/>} text='Add friend'/>
                </div>
                <button title='create group'
                        onClick={() => setOpenCreateGroup(true)}
                >
                    <SidebarIcon icon={<MdGroupAdd size="25"/>} text='Create Group'/>
                </button>
                <button title='join group'
                        onClick={() => setOpenJoinGroup(true)}
                >
                    <SidebarIcon icon={<HiUserGroup size="25"/>} text='Join Group'/>
                </button>
                <button title='setting' onClick={togglePopup}>
                    <SidebarIcon icon={<IoIosSettings size="25"/>} text='Setting'/>
                </button>
                <Divider/>
                <button title='logout'
                        onClick={handleLogout}
                >
                    <SidebarIcon icon={<RiLogoutBoxFill size="25"/>} text='Logout'/>
                </button>


            </div>
            <div className='w-full bg-primary'>
                <div className='h-12 flex items-center'>
                    <h2 className='text-xl font-bold p-4 text-headlineColor'>Message</h2>
                </div>

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
                                        to={item.type == 1 ? `/group/${item.name}` : `/people/${item.name}`}
                                        onClick={() => handleClickUserCard(item.name)}
                                        className='flex items-center gap-2 py-3 px-2 mx-2 my-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] border border-transparent hover:border-2 hover:border-btnColor rounded-lg bg-primary cursor-pointer'>
                                        <div>
                                            <Avatar
                                                username={item.name}
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <div>
                                            <h3 className='text-ellipsis text-headlineColor line-clamp-1 font-semibold text-base'>{item.type == 0 ? item.name : `Group: ${item.name}`}</h3>
                                            <div className='text-headlineColor text-xs flex items-center gap-1'>
                                                <p className='text-ellipsis line-clamp-1'>{item.actionTime}</p>
                                            </div>
                                        </div>
                                        {
                                            item.isNewMessage && (
                                            // true && (
                                                <span class="ml-16 relative flex h-3 w-3">
                                                <span
                                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-btnColor opacity-75"></span>
                                                <span span
                                                      class="relative inline-flex rounded-full h-3 w-3 bg-btnColor"></span>
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
            {
                openCreateGroup && (
                    <GroupPopup isCreateGroup={true} onClose={() => setOpenCreateGroup(false)}/>
                )
            }
            {
                openJoinGroup && (
                    <GroupPopup isCreateGroup={false} onClose={() => setOpenJoinGroup(false)}/>
                )
            }
            {showPopup && <SettingPopup handleClose={handleClose}/>}
        </div>
    )
}

export default Sidebar;