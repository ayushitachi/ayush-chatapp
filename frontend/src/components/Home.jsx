import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Chat from './Chat'
import { path } from '../Path';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
function Home() {
    const [allUsers, setallUsers] = useState([]);
    const [targetUserId, SettargetUserId] = useState();
    const { user } = useUser();
    const navigate = useNavigate();

    const getAllUsers = async () => {
        const res = await axios.get(`${path}/allUsers`);
        setallUsers(res?.data?.user)
        // console.log(res)
    }

    useEffect(() => {
        console.log(user)
        if (user == null) {
            navigate("/")
        }
        getAllUsers()
        // console.log("rerender")
    }, [])

    return (
        <div className="max-w-[740px] flex mx-auto text-center ">
            <div className='flex flex-col h-[90vh] basis-[20%] bg-gray-100 mt-10 shadow-xl border relative'>
                <div className='bg-gray-800 h-20 flex justify-center items-center p-4'>
                    <h1 className='text-white text-3xl text-center'>
                        Users
                    </h1>
                </div>
                <ul className='flex flex-col gap-2 p-2 overflow-auto no-scroll'>
                    {allUsers?.map(userdb => {
                        if (user._id == userdb._id) return;
                        return (<li key={userdb._id} onClick={() => SettargetUserId(userdb)} className='cursor-pointer hover:bg-green-400 p-2 rounded-xl'>
                            <h3 className='font-semibold'>
                                {userdb?.username}
                            </h3>

                        </li>)
                    })}
                </ul>
            </div>
            <Chat targetUserId={targetUserId} />
        </div>
    )
}

export default Home