import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
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
import {decodeFromBase64, encodeToBase64, isBase64} from "../utils/base64";
import EmojiPicker from "./EmojiPicker";
import {FaImage, FaPlus, FaVideo} from "react-icons/fa6";
import uploadFile from "../utils/uploadFile";
import Loading from "./Loading";
import {playNotificationEffect, showTitleNotification} from "../utils/notify"
import {useTranslation} from "react-i18next";
import {IoInformationCircle} from "react-icons/io5";
import InfoGroupPopup from "./InfoGroupPopup";

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
    const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState([]);
    const [openInfoPopup, setOpenInfoPopup] = useState(false);
    const [infoGroup, setInfoGroup] = useState({
        name: "",
        owner: "",
        userList: []
    });
    const uploadImageVideoRef = useRef();
    const plusIconRef = useRef();
    const {t} = useTranslation();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const messageContainer = useRef(null);
    const getAllMessage = () => {
        const messageCallback = (response) => {
            console.log('getAll method', response);
            if (response.event === 'GET_PEOPLE_CHAT_MES' && response.status === 'success') {
                setAllMessage(response.data.reverse());
                websocketService.off("GET_PEOPLE_CHAT_MES", messageCallback);
            }

            if (response.event === 'GET_ROOM_CHAT_MES' && response.status === 'success') {
                setAllMessage(response.data.chatData.reverse());
                setInfoGroup((infoGroup) => ({
                    ...infoGroup,
                    name: response.data.name,
                    owner: response.data.own,
                    userList: response.data.userList,
                }));
                websocketService.off("GET_ROOM_CHAT_MES", messageCallback);
            }
        };
        websocketService.on("GET_PEOPLE_CHAT_MES", messageCallback);
        websocketService.on("GET_ROOM_CHAT_MES", messageCallback);
        const data = {
            "action": "onchat",
            "data": {
                "event": params.type === "group" ? "GET_ROOM_CHAT_MES" : "GET_PEOPLE_CHAT_MES",
                "data": {
                    "name": params.username,
                    "page": 1
                }
            }
        };
        websocketService.send(data);
    }

    const handleUpdateMessage = () => {
        const updateMessageCallback = (response) => {
            console.log('update mess method', response);
            if (response.event === 'GET_PEOPLE_CHAT_MES' && response.status === 'success') {
                console.log('cap nhat tin nhan')
                setAllMessage((allMessage) => [...allMessage, response.data[0]]);
                websocketService.off("GET_PEOPLE_CHAT_MES", updateMessageCallback);
            }
            if (response.event === 'GET_ROOM_CHAT_MES' && response.status === 'success') {
                console.log('cap nhat tin nhan group')
                setAllMessage((allMessage) => [...allMessage, response.data.chatData[0]]);
                websocketService.off("GET_ROOM_CHAT_MES", updateMessageCallback);
            }
        };

        websocketService.on("GET_PEOPLE_CHAT_MES", updateMessageCallback);
        websocketService.on("GET_ROOM_CHAT_MES", updateMessageCallback);
        const data = {
            "action": "onchat",
            "data": {
                "event": params.type === "group" ? "GET_ROOM_CHAT_MES" : "GET_PEOPLE_CHAT_MES",
                "data": {
                    "name": params.username,
                    "page": 1
                }
            }
        };
        websocketService.send(data);
    }

    const updateUserList = (username, type, time, isReceiver) => {
        const filterList = allUser.filter(item => item.name !== username)
        setAllUser([{name: username, type: type, actionTime: time, isNewMessage: isReceiver}, ...filterList])
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (message) {
            const messageData = {
                "action": "onchat",
                "data": {
                    "event": "SEND_CHAT",
                    "data": {
                        "type": params.type === "group" ? "room" : "people",
                        "to": params.username,
                        "mes": encodeToBase64(message)
                        // "mes": message
                    }
                }
            };
            websocketService.send(messageData);
            handleUpdateMessage();
            updateUserList(params.username, params.type === "group" ? "1" : "0", now.format('YYYY-MM-DD HH:mm:ss'), false)
            setMessage("");
        }
    }

    const handleUploadFile = async (e) => {
        const file = e.target.files[0];
        console.log('upfile', file)

        if (file) {
            setLoading(true);
            const uploadedFile = await uploadFile(file);
            const fileUrl = uploadedFile.url;
            setLoading(false)
            setOpenImageVideoUpload(false)
            const messageData = {
                "action": "onchat",
                "data": {
                    "event": "SEND_CHAT",
                    "data": {
                        "type": params.type === "group" ? "room" : "people",
                        "to": params.username,
                        "mes": fileUrl
                    }
                }
            };
            console.log(fileUrl)
            websocketService.send(messageData);
            handleUpdateMessage();
        }
    }

    useEffect(() => {
        const handleSendChat = (response) => {
            if (response.event === 'SEND_CHAT' && response.status === 'success') {
                if (response.data.name === params.username || response.data.to === params.username)
                    handleUpdateMessage()
                playNotificationEffect()
                showTitleNotification()
                console.log('recireve')
                updateUserList(response.data.type === 1 ? response.data.to : response.data.name, response.data.type, now.format('YYYY-MM-DD HH:mm:ss'), true)
            }
        };

        websocketService.on('SEND_CHAT', handleSendChat);

        return () => {
            websocketService.off('SEND_CHAT', handleSendChat);
        };
    });

    const isFileUrl = (url) => {
        return url.startsWith('http://res.cloudinary.com/dkexnsrcg') || url.startsWith('https://res.cloudinary.com/dkexnsrcg');
    };

    const isImageUrl = (url) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.tiff'];
        return imageExtensions.some(extension => url.toLowerCase().endsWith(extension));
    }

    const handleAddEmoji = (value) => {
        if (position.length === 2) {
            const startPos = position[0];
            const endPos = position[1];
            const cmessage = message || "";
            const insertedMessage = cmessage?.substring(0, startPos)
                + value
                + cmessage?.substring(endPos, cmessage.length);
            setMessage(insertedMessage);
        } else {
            setMessage(message + value);
        }
    }

    useEffect(() => {
        setUserChat(params.username);
        if (user) {
            getAllMessage();
            setPage(1);
            setLoading(false);
            setHasMore(true);
            if (params.type !== "group") {
                setInfoGroup({
                    name: "",
                    owner: "",
                    userList: []
                })
            }
        }
    }, [params, user])

    useEffect(() => {
        if (currentMessage.current) {
            currentMessage.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
    }, [allMessage])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (uploadImageVideoRef.current && !uploadImageVideoRef.current.contains(e.target) && !plusIconRef.current.contains(e.target)) {
                setOpenImageVideoUpload(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
    });

    const getMessages = (pageNum, username) => {
        const messageMoreCallback = (response) => {
            console.log('getAll method', response);
            if (response.event === 'GET_PEOPLE_CHAT_MES' && response.status === 'success') {
                if (response.data.length === 0)
                    setHasMore(false);
                else
                    setAllMessage(prevMessages => [...response.data.reverse(), ...prevMessages]);
                websocketService.off("GET_PEOPLE_CHAT_MES", messageMoreCallback);
            }
            if (response.event === 'GET_ROOM_CHAT_MES' && response.status === 'success') {
                if (response.data.chatData.length === 0)
                    setHasMore(false);
                else
                    setAllMessage(prevMessages => [...response.data.chatData.reverse(), ...prevMessages]);
                websocketService.off("GET_ROOM_CHAT_MES", messageMoreCallback);
            }
        };
        websocketService.on("GET_PEOPLE_CHAT_MES", messageMoreCallback);
        websocketService.on("GET_ROOM_CHAT_MES", messageMoreCallback);
        const data = {
            "action": "onchat",
            "data": {
                "event": params.type === "group" ? "GET_ROOM_CHAT_MES" : "GET_PEOPLE_CHAT_MES",
                "data": {
                    "name": username,
                    "page": pageNum
                }
            }
        };
        websocketService.send(data);
        setLoading(false);
    };

    const loadMoreMessages = useCallback(() => {
        if (!hasMore || loading) return;
        setLoading(true);
        console.log('page', page);
        setPage(prevPage => prevPage + 1);
        console.log('nextpage', page);
        getMessages(page, params.username);

    }, [hasMore, loading, page, params.username]);

    const handleScroll = () => {
        if (messageContainer.current.scrollTop === 0) {
            console.log('scroll top')
        }

        if (messageContainer.current.scrollTop === 0 && hasMore && !loading) {
            loadMoreMessages();
            console.log('dinh', page)
        }
    };

    useEffect(() => {
        const container = messageContainer.current;
        if (container) {
            console.log('add scroll event', container)

            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [params.username, hasMore, loading, messageContainer.current]);

    const processMessage = (message) => {
        if (isBase64(message)) {
            return decodeFromBase64(message);
        }
        if (isFileUrl(message)) {
            if (isImageUrl(message)) {
                return (
                    <img
                        src={message}
                        className='w-full h-full object-scale-down'
                        alt=''
                    />
                );
            }
            return (
                <video
                    src={message}
                    className='w-full h-full object-scale-down'
                    controls
                />
            );
        }
        return message;
    };

    const getCurrentCursor = (e) => {
        if (e.target.selectionStart !== null) {
            const startPos = e.target.selectionStart;
            const endPos = e.target.selectionEnd;
            setPosition([startPos, endPos]);
        } else {
            setPosition([]);
        }
    }

    const handleTypingMessage = (e) => {
        setMessage(e.target.value);
        getCurrentCursor(e);
    }

    let prevMesCreateAt;
    let prevMsgName = allMessage[0]?.name;
    const hasMessage = message.length > 0;
    return (
        <div style={{backgroundImage: `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
            <header className='sticky top-0 h-16 bg-primary shadow-lg flex justify-between items-center px-4'>
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
                                true ? <span className='text-btnColor'>Online</span> :
                                    <span className='text-slate-400'>Offline</span>
                            }
                        </p>
                    </div>
                </div>

                {
                    params.type === 'group' && (
                        <div>
                            <button
                                onClick={() => setOpenInfoPopup(true)}
                                className='cursor-pointer text-btnColor rounded-full hover:bg-slate-200 p-2'>
                                <IoInformationCircle fontSize={24}/>
                            </button>
                        </div>
                    )
                }

            </header>

            {/*all message*/}
            <section
                ref={messageContainer}
                className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>
                {/*all message show here*/}
                <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
                    {
                        allMessage.map((msg, index) => {
                            let showDatetime = false;
                            if (prevMesCreateAt) {
                                const diffTime = dayjs(msg.createAt).diff(prevMesCreateAt, 'hour', true);
                                if (diffTime > 24) {
                                    showDatetime = true;
                                }
                            }
                            prevMesCreateAt = dayjs.utc(msg.createAt, 'DD/MM/YYYY HH:mm:ss').tz();
                            let newTimeString = dayjs.utc(msg.createAt, 'HH:mm').tz();
                            let showAvatar = prevMsgName !== msg.name;
                            prevMsgName = msg.name;
                            return (
                                <>
                                    {showDatetime && <span
                                        className="text-center">{prevMesCreateAt.format('DD/MM/YYYY HH:mm:ss')}</span>}
                                    {(showAvatar || index == 0) && (
                                        <div className={`flex items-center mb-2 ${user === msg.name ? "ml-auto" : ""}`}>
                                            <div className='relative inline-block group '>
                                                <Avatar
                                                    username={msg.name}
                                                    width={40}
                                                    height={40}
                                                    className='shadow-lg'
                                                />
                                                <div className={`hidden absolute mx-1.5 p-1 py-1 rounded-lg top-0 ${user === msg.name ? "right-full" : "left-full"} text-xs bg-black bg-opacity-70 text-white flex items-center justify-center group-hover:block`}>{msg.name}</div>
                                            </div>
                                        </div>
                                    )}
                                    <div key={msg.id}
                                         className={`p1 ${isFileUrl(msg.mes) ? "rounded-lg" : "rounded-xl"} w-fit sm:max-w-sm md:max-w-sm lg:max-w-md  ${user === msg.name ? "ml-auto bg-btnColor text-primary" : "bg-white"}`}>
                                        <div className='relative inline-block group'>
                                            <div className='break-all px-2 py-1'>
                                                {
                                                    processMessage(msg.mes)
                                                }
                                            </div>
                                            <div
                                                className={`hidden absolute mx-1.5 p-1 py-1 rounded-lg top-0 ${user === msg.name ? "right-full" : "left-full"} text-xs bg-black bg-opacity-70 text-white flex items-center justify-center group-hover:block`}>
                                                {newTimeString.format('HH:mm')}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                {
                    loading && (
                        <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
                            <Loading/>
                        </div>
                    )
                }
            </section>

            {/*send message*/}
            <section className='h-16 bg-white flex items-center px-4 shadow-md'>
                <div className='relative flex gap-2'>
                    {hasMessage ? (
                        <>
                            <button
                                ref={plusIconRef}
                                onClick={() => setOpenImageVideoUpload(!openImageVideoUpload)}
                                className='flex text-btnColor justify-center items-center w-8 h-8 rounded-full hover:bg-slate-200 transition-all duration-300 ease-in-out'>
                                <FaPlus size={20}/>
                            </button>
                            {
                                openImageVideoUpload && (
                                    <div
                                        ref={uploadImageVideoRef}
                                        className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
                                        <form>
                                            <label htmlFor='uploadVideoExt'
                                                   className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                                                <div className='text-btnColor'>
                                                    <FaVideo size={18}/>
                                                </div>
                                                <p>Video</p>
                                            </label>
                                            <label htmlFor='uploadImageExt'
                                                   className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                                                <div className='text-btnColor'>
                                                    <FaImage size={18}/>
                                                </div>
                                                <p>Image</p>
                                            </label>
                                            <input
                                                type='file'
                                                id='uploadImageExt'
                                                onChange={handleUploadFile}
                                                className='hidden'
                                                accept={"image/*"}
                                            />
                                            <input
                                                type='file'
                                                id='uploadVideoExt'
                                                onChange={handleUploadFile}
                                                className='hidden'
                                                accept={"video/*"}
                                            />
                                        </form>
                                    </div>
                                )
                            }
                        </>
                    ) : (
                        <form className='flex'>
                            <label htmlFor='uploadVideo'>
                                <div
                                    className='text-btnColor flex justify-center items-center w-8 h-8 rounded-full hover:bg-slate-200 transition-all duration-300 ease-in-out'>
                                    <FaVideo size={20}/>
                                </div>
                            </label>
                            <label htmlFor='uploadImage'>
                                <div
                                    className='text-btnColor flex justify-center items-center w-8 h-8 rounded-full hover:bg-slate-200 transition-all duration-300 ease-in-out'>
                                    <FaImage size={20}/>
                                </div>
                            </label>
                            <input
                                type='file'
                                id='uploadImage'
                                onChange={handleUploadFile}
                                className='hidden'
                                accept={"image/*"}
                            />
                            <input
                                type='file'
                                id='uploadVideo'
                                onChange={handleUploadFile}
                                className='hidden'
                                accept={"video/*"}
                            />
                        </form>
                    )}
                </div>

                {/** input box */}
                <form className='h-full w-full flex gap-2 items-center' onSubmit={handleSendMessage}>
                    <div className='h-10 flex items-center bg-gray-100 rounded-full flex-grow'>
                        <input
                            type='text'
                            placeholder={t('Type_here_message')}
                            className='bg-transparent outline-none flex-grow p-2 ml-1 text-gray-700'
                            value={message}
                            // onChange={(e) => setMessage(e.target.value)}
                            onChange={handleTypingMessage}
                            onClick={getCurrentCursor}
                            onKeyUp={getCurrentCursor}
                            onKeyDown={getCurrentCursor}
                            // onBlur={resetCursorPosition}
                        />
                        <button className='text-btnColor' type="button">
                            <EmojiPicker size={28} onSelectEmoji={handleAddEmoji}/>
                        </button>
                    </div>
                    <button className='text-btnColor hover:bg-slate-200 rounded-full p-1.5' type="submit">
                        <RiSendPlane2Fill size={24}/>
                    </button>
                </form>
            </section>
            {
                openInfoPopup && <InfoGroupPopup data={infoGroup} onClose={() => setOpenInfoPopup(false)}/>
            }
        </div>
    )
};

export default MessagePage;