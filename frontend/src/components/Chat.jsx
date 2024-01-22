import React from 'react'
import Message from "./Message"
import SendMessage from "./SendMessage"
import Navbar from './Navbar'
import { useState, useRef, useEffect } from 'react'
import { socket } from '../socket'
import { useUser } from '../context/UserContext'
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    main: `flex  flex-col h-[80%] no-scrollbar overflow-scroll`,
    sectionContainer: `flex relative flex-col  rounded-tr-2xl h-[90vh] grow bg-gray-100 mt-10 shadow-xl border relative`,
};


function Chat({ targetUserId }) {

    const { user } = useUser();
    const [allMessage, SetallMessage] = useState([]);
    const [Loading, setLoading] = useState(true);
    const scroll = useRef();
    // const targetUserId = "659ab797a4bd4c88185eff6b";

    useEffect(() => {
        socket.connect()
    })

    useEffect(() => {
        scrollToBottom();
    }, [allMessage])

    useEffect(() => {
        socket.emit('joinRoom', { userId: user?._id, targetUserId: targetUserId?._id });

        socket.on('chatHistory', (history) => {
            setLoading(false)
            SetallMessage(history);
        });

        const handleMessage = ({ sender, receiver, message }) => {
            // console.log("i am rev")
            SetallMessage((prevMessages) => [...prevMessages, { sender, receiver, message }]);
            scrollToBottom();
        }

        socket.on('receiveMessage', handleMessage);

        return () => {
            setLoading(true)
            socket.off('receiveMessage', handleMessage);
            socket.disconnect();
        };
    }, [user?._id, targetUserId]);



    const scrollToBottom = () => {
        // console.log(scroll.current.scrollHeight)
        scroll?.current?.scroll({
            top: scroll?.current?.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <section className={style.sectionContainer}>
            <Navbar targetUserId={targetUserId} />
            <div className={style.main} ref={scroll} >

                {Loading ? <CircularProgress color="success" size={50} className='absolute top-[50%] left-[50%]' /> : <>
                    {allMessage?.map((message) => (
                        <Message key={message._id} message={message} />
                    ))}</>}

            </div>
            {/* Send Message Compoenent */}
            <SendMessage scrollToBottom={scrollToBottom} targetUserId={targetUserId} />

        </section>

    );
}

export default Chat