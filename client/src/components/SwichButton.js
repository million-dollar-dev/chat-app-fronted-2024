import React, { useState } from 'react';
const SwitchButton = ({ onToggle, initialState = false }) => {
    const [isOn, setIsOn] = useState(initialState);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        if (onToggle) {
            onToggle(!isOn);
        }
    };

    return (
        <div
            className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-green-500' : 'bg-gray-300'}`}
            onClick={toggleSwitch}
        >
            <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-6' : ''}`}
            ></div>
        </div>
    );
};

export default SwitchButton;
