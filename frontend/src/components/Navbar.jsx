import React, { useEffect } from 'react'
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const style = {
    nav: `bg-gray-800 h-20 flex justify-between items-center p-4`,
    heading: `text-white text-3xl`
}

const Navbar = ({ targetUserId }) => {
    const { logout } = useUser();
    const navigate = useNavigate()

    const logUserout = () => {
        logout();
        navigate("/");
    }

    return (
        <div className={style.nav}>
            <h1 className={style.heading}>{targetUserId?.username}</h1>
            <button className='text-white font-semibold bg-red-500 p-2 rounded-full' onClick={logUserout}>Logout</button>

        </div>
    );
};

export default Navbar