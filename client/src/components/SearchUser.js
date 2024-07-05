import React, {useEffect, useRef, useState} from 'react'
import {IoClose, IoSearchOutline} from "react-icons/io5";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import {useTranslation} from "react-i18next";

const SearchUser = ({onClose}) => {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const { t } = useTranslation();

    // const inputRef = useRef()
    //
    //
    //
    // useEffect(() => inputRef.current.focus(), [])

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2 z-10'>
            <div className='w-full max-w-lg mx-auto mt-10'>
                {/**input search user */}
                <div className='bg-white rounded h-14 overflow-hidden flex '>
                    <input
                        type='text'
                        // ref={inputRef}
                        placeholder={t('search_user_by_name')}
                        className='w-full outline-none py-1 h-full px-4'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <div className='h-14 w-14 flex justify-center items-center'>
                        <IoSearchOutline size={25}/>
                    </div>
                </div>

                {/**display search user */}
                <div className='bg-white mt-2 w-full p-4 rounded'>
                    {/**no user found */}
                    {
                        search.length === 0 && !loading && (
                            <p className='text-center text-slate-500'>{t('no_user_found!')}</p>
                        )
                    }
                    {
                        loading && (
                            <p><Loading/></p>
                        )
                    }
                    {
                        search.length !== 0 && !loading && (
                            <UserSearchCard key={search} username={search} onClose={onClose}/>
                        )
                    }
                </div>
            </div>

            <div className='absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white' onClick={onClose}>
                <button>
                    <IoClose/>
                </button>
            </div>
        </div>
    )
}

export default SearchUser