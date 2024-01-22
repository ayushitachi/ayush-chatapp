import React, { useState } from 'react';
import { socket } from '../socket';
import { useUser } from '../context/UserContext';
import SendIcon from '@mui/icons-material/Send';

const style = {
    form: `h-14 rounded-br-2xl w-full max-w-[728px]  flex text-xl absolute bottom-0`,
    input: `w-full text-xl rounded-full p-2 bg-gray-900 text-white outline-none border-none`,
    button: `w-[10%] rounded-full font-semibold text-lg bg-green-500`,
};

const SendMessage = ({ scrollToBottom, targetUserId }) => {
    const [input, setInput] = useState('');
    const { user } = useUser();

    const sendMessage = async (e) => {
        e.preventDefault()
        if (input === '') {
            alert('Please enter a valid message')
            return
        }
        // console.log(user)
        socket.emit('sendMessage', {
            sender: user._id,
            receiver: targetUserId._id,
            message: input,
        });
        setInput('')
        scrollToBottom();
    }

    return (
        <form onSubmit={sendMessage} className={style.form}>
            <div className={`flex w-full ${style.input} `}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full text-lg rounded-full p-2 bg-gray-900 text-white outline-none border-none"
                    type='text'
                    placeholder='Message'
                />
                <button className={style.button} type='submit'>
                    <SendIcon />
                </button>
            </div>
        </form>
    );
};

export default SendMessage;