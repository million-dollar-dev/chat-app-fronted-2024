import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import searchUser from "./SearchUser";
import {useEffect, useState} from "react";
import Avatar from "./Avatar";
import {FaAngleLeft} from "react-icons/fa";
import {HiDotsVertical} from "react-icons/hi";

const MessagePage = () => {
    const params = useParams();
    // const user = useSelector(searchUser);
    const [user, setUser] = useState("");
    useEffect(() => {
        setUser(params.username)
    }, [params])
    return (
        <div>
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
        </div>
    )

};

export default MessagePage;