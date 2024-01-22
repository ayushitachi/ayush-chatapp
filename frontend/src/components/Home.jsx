import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Chat from './Chat'
import { path } from '../Path';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { socket } from '../socket'

function Home() {
    const [allUsers, setallUsers] = useState([]);
    const [targetUserId, SettargetUserId] = useState();
    const [onlineUsers, SetonlineUsers] = useState();
    const { user } = useUser();
    const navigate = useNavigate();

    const fetcher = async (...args) => {
        const res = await axios.get(...args);
        setallUsers(res?.data?.user)
        // console.log(res)
    }

    useEffect(() => {
        // socket.connect()

        // socket.on('connect', () => {
        //     // console.log('Connected to server');

        //     // Emit event when a user goes online
        //     if (user) {
        //         socket.emit('userOnline', { userId: user?._id });
        //     }
        // });

        // socket.on('disconnect', () => {
        //     // console.log('Disconnected from server');

        //     // Emit event when a user goes offline
        //     socket.emit('userOffline', { userId: user?._id });
        // });

        // socket.on("onlineUsers", (onlineUsers) => {
        //     // SetonlineUsers(onlineUsers)
        //     console.log(onlineUsers)
        // })


        // return () => {
        //     socket.disconnect();

        // }

    })

    // useEffect(() => {
    //     console.log(onlineUsers)
    // }, [onlineUsers])

    const { data, error, isLoading } = useSWR(`${path}/allUsers`, fetcher)

    useEffect(() => {
        if (user == null) {
            navigate("/")
        }
        // getAllUsers()

        // console.log(data)
        // console.log("rerender")
    }, [])

    return (
        <div className="max-w-[740px] flex mx-auto text-center ">
            <div className='flex flex-col h-[90vh] basis-[20%] rounded-l-2xl bg-gray-100 mt-10 shadow-xl border relative'>
                <div className='bg-gray-800 h-20 flex rounded-tl-2xl justify-center items-center p-4'>
                    <h1 className='text-white text-3xl text-center'>
                        Users
                    </h1>
                </div>
                <ul className='flex flex-col gap-2 p-2 overflow-auto no-scroll'>
                    {isLoading ? <Stack spacing={3}>
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                        <Skeleton animation="wave" />
                    </Stack> : <>{allUsers?.map(userdb => {
                        if (user._id == userdb._id) return;
                        return (<li key={userdb._id} onClick={() => SettargetUserId(userdb)} className='cursor-pointer hover:bg-green-400 p-2 rounded-xl'>
                            <h3 className='font-semibold'>
                                {userdb?.username}
                            </h3>

                        </li>)
                    })} </>}

                </ul>
            </div>
            <Chat targetUserId={targetUserId} />
        </div>
    )
}

export default Home