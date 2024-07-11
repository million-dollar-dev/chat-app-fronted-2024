import React, { useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { FaSmile } from 'react-icons/fa';

const EmojiPicker = ({ onSelectEmoji }) => {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState(null);
    const [message, setMessage] = useState('');

    const addEmoji = (emoji) => {
        onSelectEmoji(emoji.native);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setPickerVisible(!isPickerVisible)
                }}
                className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:hover:bg-slate-200"
                type="button"
            >
                <FaSmile className="h-6 w-6 text-primary" />
            </button>
            {isPickerVisible && (
                <div className="absolute bottom-full mb-2 right-0 transform z-10">
                    <Picker
                        data={data}
                        previewPosition="top"
                        onEmojiSelect={(emoji) => {
                            addEmoji(emoji);
                        }}
                        navPosition="top"
                        onClickOutside={() =>setPickerVisible(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPicker;
