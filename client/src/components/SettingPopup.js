import React, { useState } from 'react';
import SwitchButton from "./SwitchButton";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import Avatar from "./Avatar";
import {selectorUser} from "../redux/selectors";
import {useSelector} from "react-redux";


const SettingPopup = ({handleClose}) => {
    // const user = selectorUser;
    const user = useSelector(selectorUser);
    const [isOpen, setIsOpen] = useState(true);
    const [soundNotification, setSoundNotification] = useState(false);
    const [doNotDisturb, setDoNotDisturb] = useState(false);
console.log(user);
    const onClose = () => {
        handleClose();
    }

    const handleSoundNotificationToggle = () => {
        setSoundNotification(!soundNotification);
    };

    const handleDoNotDisturbToggle = () => {
        setDoNotDisturb(!doNotDisturb);
    };

    return (
        <div className="relative">
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-83 p-4 relative">
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h3 className="text-xl font-semibold text-center flex-grow">Options</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-900 hover:bg-primary border rounded-full w-9 h-9 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div>
                            <div className="mb-4">
                                <h4 className="font-bold text-left">Account</h4>
                                <div className="flex items-center mt-2">
                                    <Avatar height={50} width={50} username={user} />
                                    <div className="pl-3">
                                        <p className="font-semibold text-left">{user}</p>
                                        <a href="#" className="text-left">
                                            View your profile
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="mb-4">
                                <h4 className="font-bold text-left">
                                    Active Status:  <span className="">ON</span>
                                </h4>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="mb-4">
                                <h4 className="font-bold text-left">Notifications</h4>
                                <div className="mt-2">
                                    <label className="flex items-center justify-between">
                                        <span className="font-bold">Notification Sounds</span>
                                    </label>
                                    <div className="flex justify-between">
                                    <p className="text-gray-500 text-sm mt-1 text-left flex " style={{ width: "80%" }}>
                                        <FaVolumeHigh className="mr-2" size={25}/>
                                        Use sounds for notifications about messages, incoming calls, and video/audio chats in the app.
                                    </p>
                                    <SwitchButton onToggle={handleSoundNotificationToggle} initialState={soundNotification} />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label className="flex items-center">
                                        <span className="font-bold">Do Not Disturb</span>
                                    </label>
                                    <div className="flex justify-between">
                                    <p className="text-gray-500 text-sm mt-1 text-left flex">
                                        <FaVolumeHigh className="mr-2" size={25}/>
                                        Turn off notifications for a specified period of time.
                                    </p>
                                    <SwitchButton onToggle={handleDoNotDisturbToggle} initialState={doNotDisturb} />
                                    </div>
                                </div>
                            </div>
                            {/*<hr className="my-4 border-gray-300" />*/}
                            {/*<div className="mb-4 flex">*/}
                            {/*    <FaCreditCard className="mr-2" size={20} />*/}
                            {/*    <h4 className="font-bold text-left">Quản lý khoản thanh toán</h4>*/}
                            {/*</div>*/}
                            {/*<div className="mb-4 flex">*/}
                            {/*    <AiFillMessage className="mr-2" size={20} />*/}
                            {/*    <h4 className="font-bold text-left">Quản lý hoạt động gửi tin nhắn</h4>*/}
                            {/*</div>*/}
                            {/*<div className="mb-4 flex">*/}
                            {/*    <ImBlocked className="mr-2" size={20} />*/}
                            {/*    <h4 className="font-bold text-left">Quản lý phần Chặn</h4>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default SettingPopup;
