import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useContext, useEffect, useRef, useState} from "react";
import Avatar from "./Avatar";
import {FaAngleLeft} from "react-icons/fa";
import {RiSendPlane2Fill} from "react-icons/ri";
import backgroundImage from '../assets/wallapaper.jpeg';
import websocketService from "../services/websocket";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {selectorUser} from "../redux/selectors";
import AllUserContext from "../context/AllUserContext";
import {isBase64, decodeFromBase64, encodeToBase64} from "../utils/base64";
import EmojiPicker from "./EmojiPicker";

const tz = 'Asia/Ho_Chi_Minh';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(tz);
const now = dayjs()

const MessagePage = () => {
    const params = useParams();
    const user = useSelector(selectorUser);
    const [userChat, setUserChat] = useState("");
    const [allMessage, setAllMessage] = useState([]);
    const [message, setMessage] = useState("");
    const currentMessage = useRef(null);
    const {allUser, setAllUser} = useContext(AllUserContext);

    const getAllMessage = (username) => {
        const data = {
            "action": "onchat",
            "data": {
                "event": "GET_PEOPLE_CHAT_MES",
                "data": {
                    "name": username,
                    "page": 1
                }
            }
        };
        websocketService.send(data);
        websocketService.socket.onmessage = (message) => {
            const response = JSON.parse(message.data);
            console.log('getAll method', response)
            if (response.event === 'GET_PEOPLE_CHAT_MES' && response.status === 'success')
                setAllMessage(response.data.reverse());
            if (response.event === 'SEND_CHAT' && response.status === 'success') {
                handleUpdateMessage()
                updateUserList(response.data.name, now.format('YYYY-MM-DD HH:mm:ss'))
            }
        };
    }

    const handleUpdateMessage = () => {
        const data = {
            "action": "onchat",
            "data": {
                "event": "GET_PEOPLE_CHAT_MES",
                "data": {
                    "name": params.username,
                    "page": 1
                }
            }
        };
        websocketService.send(data);

        websocketService.socket.onmessage = (message) => {
            const response = JSON.parse(message.data)
            console.log('update mess method', response);
            if (response.event === 'SEND_CHAT' && response.status === 'success') {
                handleUpdateMessage()
                updateUserList(response.data.name, now.format('YYYY-MM-DD HH:mm:ss'))             
            } if (response.event === 'GET_PEOPLE_CHAT_MES' && response.status === 'success'){
                console.log('cap nhat tin nhan')
                setAllMessage((allMessage) => [...allMessage, response.data[0]]);           
            }            
        };
    }

    const updateUserList = (username, time) => {
        console.log('reciever', username)
        console.log('time', time)        
        const filterList = allUser.filter(item => item.name !== username)
        console.log(filterList)
        setAllUser([{name: username, actionTime: time}, ...filterList])
    }
    
    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message) {
            const messageData = {
                "action": "onchat",
                "data": {
                    "event": "SEND_CHAT",
                    "data": {
                        "type": "people",
                        "to": params.username,
                        "mes": encodeToBase64(message)
                    }
                }
            };
            websocketService.send(messageData);
            websocketService.socket.onmessage = (message) => {
                const response = JSON.parse(message.data)
                console.log('send res', response)
            };
            handleUpdateMessage();
            updateUserList(params.username, now.format('YYYY-MM-DD HH:mm:ss'))
            setMessage("");
        }
    }

    const handleAddEmoji = (value) => {
        setMessage(message + value);
    }

    useEffect(() => {
        setUserChat(params.username);
        if (user) {
            getAllMessage(params.username);
        }
    }, [params, user])

    useEffect(() => {
        if (currentMessage.current) {
            currentMessage.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
    }, [allMessage])

    let prevMesCreateAt;

    return (
        <div style={{backgroundImage: `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
            <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
                <div className='flex items-center gap-4'>
                    <Link to={"/"} className='lg:hidden'>
                        <FaAngleLeft size={25}/>
                    </Link>
                    <div>
                        <Avatar
                            width={50}
                            height={50}
                            username={params?.username}
                        />
                    </div>
                    <div>
                        <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{params?.username}</h3>
                        <p className='-my-2 text-sm'>
                            {
                                true ? <span className='text-primary'>Online</span> :
                                    <span className='text-slate-400'>Offline</span>
                            }
                        </p>
                    </div>
                </div>
            </header>

            {/*all message*/}
            <section
                className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>
                {/*all message show here*/}
                <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
                    {
                        allMessage.map((msg) => {
                            let showDatetime = false;
                            if (prevMesCreateAt) {
                                const diffTime = dayjs(msg.createAt).diff(prevMesCreateAt, 'hour', true);
                                if (diffTime > 24) {
                                    showDatetime = true;
                                }
                            }
                            prevMesCreateAt = dayjs.utc(msg.createAt, 'DD/MM/YYYY HH:mm:ss').tz();
                            let newTimeString = dayjs.utc(msg.createAt, 'HH:mm').tz();
                            return(
                                <>
                                    {showDatetime && <span className= "text-center">{prevMesCreateAt.format('DD/MM/YYYY HH:mm:ss')}</span>}

                                    <div key={msg.id}
                                         className={` p-1 py-1 rounded-full w-fit max-w-[280px] md:max-w-sm lg:max-w-md  ${userChat !== msg.name ? "ml-auto bg-teal-100" : "bg-white"}`}>
                                        <div className='px-2 relative inline-block group'>
                                            {
                                                isBase64(msg.mes) ? decodeFromBase64(msg.mes) : msg.mes
                                            }
                                            <div
                                                className={`hidden absolute mx-1.5 p-1 py-1 rounded-lg top-0 ${userChat !== msg.name ? "right-full" : "left-full" } text-xs bg-black bg-opacity-70 text-white flex items-center justify-center group-hover:block`}>
                                                {newTimeString.format('HH:mm')}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </section>

            {/*send message*/}
            <section className='h-16 bg-white flex items-center px-4'>
                {/**input box */}
                <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
                    <input
                        type='text'
                        placeholder='Type here message...'
                        className='py-1 px-4 outline-none w-full h-full'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button className='text-primary hover:text-secondary' type="button" >
                        <EmojiPicker size={28} onSelectEmoji={handleAddEmoji} />
                    </button>
                    <button className='text-primary hover:text-secondary' type="submit">
                        <RiSendPlane2Fill size={28}/>
                    </button>


                </form>
            </section>
        </div>
    )
};

export default MessagePage;