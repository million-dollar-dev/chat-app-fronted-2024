import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({username, onClose}) => {
    return (
        <Link to={"/"} onClick={onClose} className='flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer'>
            <div>
                <Avatar
                    width={50}
                    height={50}
                    username={username}
                />
            </div>
            <div>
                <div className='font-semibold text-ellipsis line-clamp-1'>
                    {username}
                </div>
                <p className='text-sm text-ellipsis line-clamp-1'></p>
            </div>
        </Link>
    )
}

export default UserSearchCard