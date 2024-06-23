import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import searchUser from "./SearchUser";
import {useEffect, useState} from "react";
import Avatar from "./Avatar";
import {FaAngleLeft} from "react-icons/fa";
import { RiSendPlane2Fill } from "react-icons/ri";
import backgroundImage from '../assets/wallapaper.jpeg'

const MessagePage = () => {
    const params = useParams();
    // const user = useSelector(searchUser);
    const [user, setUser] = useState("");
    useEffect(() => {
        setUser(params.username)
    }, [params])
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
                <h1>Message</h1>
            </section>

            {/*send message*/}
            <section className='h-16 bg-white flex items-center px-4'>
                {/**input box */}
                <form className='h-full w-full flex gap-2'>
                    <input
                        type='text'
                        placeholder='Type here message...'
                        className='py-1 px-4 outline-none w-full h-full'
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