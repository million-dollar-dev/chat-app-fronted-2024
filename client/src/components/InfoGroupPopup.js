import React, { useState } from 'react';
import Avatar from './Avatar';

const InfoGroupPopup = ({ onClose, data}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h3 className="text-xl font-semibold text-center flex-grow">
                        Group Information: {data.name}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-900 hover:bg-slate-300 border rounded-full w-9 h-9 text-2xl"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="mb-4">
                    <div className="block text-sm font-medium text-gray-700 mb-1">Owner</div>
                    <div className='flex items-center ml-12'>
                        <div className='mr-6 mt-4'>
                            <Avatar
                                width={50}
                                height={50}
                                username={data.owner}
                            />
                        </div>
                        <div>
                            <h3 className='mt-4 font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{data.owner}</h3>
                        </div>
                    </div>
                </div>
                
                <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-6">Members: {data.userList.length}</div>
                    <div className='h-40 overflow-x-hidden overflow-y-auto scrollbar'>
                        {data.userList.map((item, index) => (
                            <div key={index} className='flex items-center mb-2 ml-12'>
                                <div className='mr-6'>
                                    <Avatar
                                        width={50}
                                        height={50}
                                        username={item.name}
                                    />
                                </div>
                                <div>
                                    <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{item.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoGroupPopup;
