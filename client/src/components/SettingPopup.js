import React, { useState } from 'react';
import SwitchButton from "./SwitchButton";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";


const SettingPopup = ({handleClose}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [soundNotification, setSoundNotification] = useState(false);
    const [doNotDisturb, setDoNotDisturb] = useState(false);

    // const togglePopup = () => {
    //     setIsOpen(!isOpen);
    // };

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
            {/*<button*/}
            {/*    onClick={togglePopup}*/}
            {/*    className="px-4 py-2 bg-blue-500 text-white rounded"*/}
            {/*>*/}
            {/*    Open Popup*/}
            {/*</button>*/}

            {/*{isOpen && (*/}
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-83 p-4 relative">
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h3 className="text-xl font-semibold text-center flex-grow">Tùy chọn</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-900 hover:bg-gray-400 border rounded-full w-9 h-9 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div>
                            <div className="mb-4">
                                <h4 className="font-bold text-left">Tài khoản</h4>
                                <div className="flex items-center mt-2">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="Avatar"
                                        className="rounded-full mr-2"
                                    />
                                    <div>
                                        <p className="font-semibold text-left">Hoàng Tuấn</p>
                                        <a href="#" className="text-left">
                                            Xem trang cá nhân của bạn
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="mb-4">
                                <h4 className="font-bold text-left">
                                    Trạng thái hoạt động: <span className="">ĐANG BẬT</span>
                                </h4>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="mb-4">
                                <h4 className="font-bold text-left">Thông báo</h4>
                                <div className="mt-2">
                                    <label className="flex items-center justify-between">
                                        <span className="font-bold">Âm thanh thông báo</span>
                                    </label>
                                    <div className="flex justify-between">
                                    <p className="text-gray-500 text-sm mt-1 text-left flex " style={{ width: "80%" }}>
                                        <FaVolumeHigh className="mr-2" size={25}/>
                                        Dùng thông báo bằng âm thanh để biết về tin nhắn, cuộc gọi đến, đoạn chat video và âm thanh trong ứng dụng.
                                    </p>
                                    <SwitchButton onToggle={handleSoundNotificationToggle} initialState={soundNotification} />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label className="flex items-center">
                                        <span className="font-bold">Không làm phiền</span>
                                    </label>
                                    <div className="flex justify-between">
                                    <p className="text-gray-500 text-sm mt-1 text-left flex">
                                        <FaVolumeHigh className="mr-2" size={25}/>
                                        Tắt thông báo trong một khoảng thời gian cụ thể.
                                    </p>
                                    <SwitchButton onToggle={handleDoNotDisturbToggle} initialState={doNotDisturb} />
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="mb-4 flex">
                                <FaCreditCard className="mr-2" size={20} />
                                <h4 className="font-bold text-left">Quản lý khoản thanh toán</h4>
                            </div>
                            <div className="mb-4 flex">
                                <AiFillMessage className="mr-2" size={20} />
                                <h4 className="font-bold text-left">Quản lý hoạt động gửi tin nhắn</h4>
                            </div>
                            <div className="mb-4 flex">
                                <ImBlocked className="mr-2" size={20} />
                                <h4 className="font-bold text-left">Quản lý phần Chặn</h4>
                            </div>
                        </div>
                    </div>
                </div>
            {/*)}*/}
        </div>
    );
};

export default SettingPopup;
