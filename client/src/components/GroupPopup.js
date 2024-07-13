import React, { useState } from 'react';
import websocketService from "../services/websocket";
import toast from "react-hot-toast";

const GroupChatPopup = ({ onClose, isCreateGroup }) => {
    const [groupName, setGroupName] = useState('');

    const handleJoinGroup = () => {
        console.log('edđ')
        websocketService.send({
            "action": "onchat",
            "data": {
                "event": "JOIN_ROOM",
                "data": {
                    "name": groupName.trim()
                }
            }
        })
        websocketService.socket.onmessage = (message) => {
            const response = JSON.parse(message.data);
            console.log(response);
            if (response.event === 'JOIN_ROOM' && response.status === 'success') {
                toast.success('Join successfully');
            }
            if (response.event === 'JOIN_ROOM' && response.status === 'error') {
                toast.error(response.mes);
            }
        }
        onClose();
    };

    const handleCreateGroup = () => {
        websocketService.send({
            "action": "onchat",
            "data": {
                "event": "CREATE_ROOM",
                "data": {
                    "name": groupName.trim()
                }
            }
        })
        websocketService.socket.onmessage = (message) => {
            const response = JSON.parse(message.data);
            console.log(response);
            if (response.event === 'CREATE_ROOM' && response.status === 'success') {
                toast.success('Create successfully');
                handleJoinGroup(groupName)
            }
            if (response.event === 'CREATE_ROOM' && response.status === 'error') {
                toast.error(response.mes);
            }
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h3 className="text-xl font-semibold text-center flex-grow">
                        {isCreateGroup ? 'Create a group chat' : 'Join a group chat'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-900 hover:bg-slate-300 border rounded-full w-9 h-9 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        placeholder="My Group"
                    />
                </div>
                <div className="flex justify-center">
                    {isCreateGroup ? (<button
                        className="bg-btnColor text-btnTextColor px-8 py-2 rounded-full"
                        onClick={handleCreateGroup}
                    >
                        Create
                    </button>) : (
                        <button
                            className="bg-btnColor text-btnTextColor px-8 py-2 rounded-full"
                            onClick={handleJoinGroup}
                        >
                            Join
                        </button>)
                    }
                </div>
            </div>
        </div>
    );
};

export default GroupChatPopup;
