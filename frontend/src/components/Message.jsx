import React from 'react';
import { useUser } from '../context/UserContext';


const style = {
    message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
    name: `absolute mt-[-4rem] text-gray-600 text-xs`,
    sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
    received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
};

const Message = ({ message }) => {
    const { user } = useUser();
    const messageClass =
        user._id === message.sender
            ? `${style.sent}`
            : `${style.received}`

    return (
        <div>
            <div className={`${style.message} ${messageClass}`}>
                {/* <p className={style.name}>{message.name}</p> */}
                <p>{message.message}</p>
            </div>
        </div>
    );
};

export default Message;