import React, { useState } from 'react';
import { socket } from '../socket';
import { useUser } from '../context/UserContext';

const style = {
    form: `h-14 w-full max-w-[728px]  flex text-xl absolute bottom-0`,
    input: `w-full text-xl p-3 bg-gray-900 text-white outline-none border-none`,
    button: `w-[20%] bg-green-500`,
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
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={style.input}
                type='text'
                placeholder='Message'
            />
            <button className={style.button} type='submit'>
                Send
            </button>
        </form>
    );
};

export default SendMessage;