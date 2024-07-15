import React, { useState } from 'react';
import websocketService from "../services/websocket";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";

const GroupChatPopup = ({ onClose, isCreateGroup }) => {
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();
    const { t } = useTranslation();
    const handleJoinGroup = () => {
        console.log('edđ')
        const messageCallback = (response) => {
            console.log('getAll method', response);
            if (response.event === 'JOIN_ROOM' && response.status === 'success') {
                toast.success(t('join_successfully'));
                navigate('/group/' + groupName.trim())
            }
            if (response.event === 'JOIN_ROOM' && response.status === 'error') {
                toast.error(response.mes);
            }
        };

        websocketService.on("JOIN_ROOM", messageCallback);
        websocketService.send({
            "action": "onchat",
            "data": {
                "event": "JOIN_ROOM",
                "data": {
                    "name": groupName.trim()
                }
            }
        })
        onClose();
    };

    const handleCreateGroup = () => {
        const messageCallback = (response) => {
            console.log('getAll method', response);
            if (response.event === 'CREATE_ROOM' && response.status === 'success') {
                toast.success(t('create_successfully'));
                handleJoinGroup(groupName)
            }
            if (response.event === 'CREATE_ROOM' && response.status === 'error') {
                toast.error(response.mes);
            }
            websocketService.off("CREATE_ROOM", messageCallback);
        };

        websocketService.on("CREATE_ROOM", messageCallback);
        websocketService.send({
            "action": "onchat",
            "data": {
                "event": "CREATE_ROOM",
                "data": {
                    "name": groupName.trim()
                }
            }
        })
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h3 className="text-xl font-semibold text-center flex-grow">
                        {isCreateGroup ? t('create_a_group_chat') : t('join_a_group_chat')}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-900 hover:bg-slate-300 border rounded-full w-9 h-9 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        placeholder={t('my_group')}
                    />
                </div>
                <div className="flex justify-center">
                    {isCreateGroup ? (<button
                        className="bg-btnColor text-btnTextColor px-8 py-2 rounded-full"
                        onClick={handleCreateGroup}
                    >
                        {t('create')}
                    </button>) : (
                        <button
                            className="bg-btnColor text-btnTextColor px-8 py-2 rounded-full"
                            onClick={handleJoinGroup}
                        >
                            {t('join')}
                        </button>)
                    }
                </div>
            </div>
        </div>
    );
};

export default GroupChatPopup;
