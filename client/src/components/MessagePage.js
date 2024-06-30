import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import searchUser from "./SearchUser";
import {useEffect, useRef, useState} from "react";
import Avatar from "./Avatar";
import {FaAngleLeft} from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import backgroundImage from '../assets/wallapaper.jpeg';
import websocketService from "../services/websocket";
import {setUser} from "../redux/actions";
import toast from "react-hot-toast";

const MessagePage = () => {
    const params = useParams();
    // const user = useSelector(searchUser);
    const [userChat, setUserChat] = useState("");
    const [allMessage, setAllMessage] = useState([]);
    const [message,setMessage] = useState("");
    const currentMessage = useRef(null);

    const getAllMessage = (username) => {
        const data = {
            "action": "onchat",
            "data": {
                "event": "GET_PEOPLE_CHAT_MES",
                "data": {
                    "name": username,
                    "page":1
                }
            }
        };
        websocketService.send(data);
        websocketService.socket.onmessage = (message) => {
            const response = JSON.parse(message.data);
            console.log(response);
            console.log('all message now', allMessage)
            if (response.event === 'GET_PEOPLE_CHAT_MES' && response.status === 'success')
                setAllMessage(response.data.reverse());
            if (response.event === 'SEND_CHAT' && response.status === 'success')
                handleUpdateMessage();
        };
    }

    const handleUpdateMessage = () => {
        const data = {
            "action": "onchat",
            "data": {
                "event": "GET_PEOPLE_CHAT_MES",
                "data": {
                    "name": params.username,
                    "page":1
                }
            }
        };
        websocketService.send(data);

        websocketService.socket.onmessage = (message) => {
            const response = JSON.parse(message.data)
            console.log(response)
            console.log('send')
            const test = [...allMessage, response.data[0]];
            console.log('test', test);
            setAllMessage((allMessage) => [...allMessage, response.data[0]]);
        };
    }

    const handleSendMessage = (e)=>{
        e.preventDefault()
        if(message){
            const messageData = {
                "action": "onchat",
                "data": {
                    "event": "SEND_CHAT",
                    "data": {
                        "type": "people",
                        "to": params.username,
                        "mes": message
                    }
                }
            };
            websocketService.send(messageData);
            websocketService.socket.onmessage = (message) => {
                const response = JSON.parse(message.data)
            };
            handleUpdateMessage();
            setMessage("");
        }
    }



    useEffect(() => {
        setUserChat(params.username);
        if (websocketService !== null) {
            getAllMessage(params.username);
        }
    }, [params])

    useEffect(()=>{
        if(currentMessage.current){
            currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
        }
    },[allMessage])


    return (
        <div style={{ backgroundImage : `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
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
                        allMessage.map((msg)=>{
                            let timeSplit = msg.createAt.split(" ");
                            let timeString = timeSplit[1];
                            let [hours, minutes, seconds] = timeString.split(':').map(Number);
                            hours = (hours + 7) % 24;
                            let newTimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                            return(
                                <div key={msg.id}
                                     className={` p-1 py-1 rounded-full w-fit max-w-[280px] md:max-w-sm lg:max-w-md  ${userChat !== msg.name ? "ml-auto bg-teal-100" : "bg-white"}`}>
                                    <div className='px-2 relative inline-block group'>
                                        {msg.mes}
                                        <div
                                            className={`hidden absolute mx-1.5 p-1 py-1 rounded-lg top-0 ${userChat !== msg.name ? "right-full" : "left-full" } text-xs bg-black bg-opacity-70 text-white flex items-center justify-center group-hover:block`}>
                                            {newTimeString}
                                        </div>
                                    </div>
                                </div>
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
                    <button className='text-primary hover:text-secondary'>
                        <RiSendPlane2Fill size={28}/>
                    </button>
                </form>
            </section>
        </div>
    )

};

export default MessagePage;