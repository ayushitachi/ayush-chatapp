import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { path } from '../Path';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setusername] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const { login } = useUser();
    const navigate = useNavigate()

    const signup = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${path}/signup`, { username, email, password })
        if (res?.data?.user !== null) {
            login(res.data.user);
            navigate("/chat")
        }
        // console.log(res)
    }

    return (
        <div className='flex h-[100vh]'>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    onChange={(e) => setusername(e.target.value)}
                                    type="text"
                                    required
                                    className="block w-full p-2 focus:outline-none   rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e96989] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-black">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    onChange={(e) => setemail(e.target.value)}
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full p-2 focus:outline-none   rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e96989] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-black">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    onChange={(e) => setpassword(e.target.value)}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full p-2 focus:outline-none rounded-md  border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#e96989] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={signup}
                                className="flex w-full justify-center rounded-md bg-[#ea4e75] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#cd4d6d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e96989]"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/" className="font-semibold leading-6 text-[#ea4e75] hover:text-[#cd4d6d]">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup