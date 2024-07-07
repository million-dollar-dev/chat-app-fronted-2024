import React, { useState } from 'react';
import SwitchButton from "./SwitchButton";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import { AiFillMessage } from "react-icons/ai";
import Avatar from "./Avatar";
import {selectorUser} from "../redux/selectors";
import {useSelector} from "react-redux";
import ChangeLanguageButton from "./ChangeLanguageButton";
import {useTranslation} from "react-i18next";


const SettingPopup = ({handleClose}) => {
    const user = useSelector(selectorUser);
    const [isOpen, setIsOpen] = useState(true);
    const [soundNotification, setSoundNotification] = useState(false);
    const [doNotDisturb, setDoNotDisturb] = useState(false);
    const { t } = useTranslation();

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
        <div className="relative" >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 relative" style={{"width":700, "height": 500}}>
                        <div className="flex justify-between items-center border-b pb-2 mb-4">
                            <h3 className="text-xl font-semibold text-center flex-grow">{t('options')}</h3>
                            <button
                                onClick={onClose}
                                className="text-gray-900 hover:bg-primary border rounded-full w-9 h-9 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div>
                            <div className="mb-4">
                                <h4 className="font-bold text-left">{t('account')}</h4>
                                <div className="flex justify-between mt-2">
                                    <div className="flex items-center">
                                        <Avatar height={50} width={50} username={user}/>
                                        <div className="pl-3">
                                            <p className="font-semibold text-left">{user}</p>
                                            <a href="#" className="text-left">
                                                {t('view_your_profile')}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-gray-300"/>
                            <div className="mb-4 flex flex-row justify-between items-center">
                                <h4 className="font-bold text-center">
                                    {t('change_language')}
                                </h4>
                                <ChangeLanguageButton/>
                            </div>
                            <hr className="my-4 border-gray-300"/>

                            <div className="mb-4">
                                <h4 className="font-bold text-left">{t('notifications')}</h4>
                                <div className="mt-2">
                                    <label className="flex items-center justify-between">
                                        <span className="font-bold">{t('notification_sounds')}</span>
                                    </label>
                                    <div className="flex justify-between">
                                        <p className="text-gray-500 text-sm mt-1 text-left flex "
                                           style={{width: "80%"}}>
                                            <FaVolumeHigh className="mr-2" size={25}/>
                                            {t('use_sounds_for_notifications_about_messages_incoming_calls_and_video/audio_chat_in_the_app.')}
                                        </p>
                                        <SwitchButton onToggle={handleSoundNotificationToggle}
                                                      initialState={soundNotification}/>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label className="flex items-center">
                                        <span className="font-bold">{t('do_not_disturb')}</span>
                                    </label>
                                    <div className="flex justify-between">
                                        <p className="text-gray-500 text-sm mt-1 text-left flex">
                                            <FaVolumeHigh className="mr-2" size={25}/>
                                            {t('turn_off_notifications_for_a_specified_period_of_time.')}
                                        </p>
                                        <SwitchButton onToggle={handleDoNotDisturbToggle} initialState={doNotDisturb}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default SettingPopup;
