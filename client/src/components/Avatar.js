import {PiUserCircle} from "react-icons/pi";
import {useEffect, useState} from "react";
import websocketService from "../services/websocket";


const Avatar = ({username, width, height, isOnline}) => {
    let avatarName = "";
    if (username) {
        const splitName = username?.split(" ");
        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0];
        } else {
            avatarName = splitName[0][0];
        }
    }

    return (
        <div className={`text-slate-800  rounded-full font-bold relative`}
             style={{width: width + "px", height: height + "px"}}>
            {
                username ? (
                    <div style={{width: width + "px", height: height + "px"}}
                         className='overflow-hidden rounded-full flex justify-center items-center text-lg bg-slate-200'>
                        {avatarName}
                    </div>
                ) : (
                    <PiUserCircle
                        size={width}
                    />
                )
            }
            {
                isOnline && (
                    <div className='bg-green-600 p-1 absolute bottom-1 -right-0 z-10 rounded-full border-2 border-white'></div>
                )
            }
        </div>
    )
};

export default Avatar;