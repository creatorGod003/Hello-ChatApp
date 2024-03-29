import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='min-h-screen bg-gradient-to-b to-teal-300 from-indigo-500 flex flex-col justify-center items-center'>
            <div className="flex flex-col w-[70%] sm:w-[40%] md:w-[30%] lg:w-[25%] mx-auto p-2 bg-white shadow-2xl rounded">
                <h1 className='text-xl p-4 my-2 font-bold'>Login to Hello Chat App</h1>
                <Link 
                    className='bg-blue-700 text-white m-4 text-center p-2 shadow-2xl border-4 border-white rounded-md'
                    to={"/login-with-emailOrNumber"}
                >
                    Continue with Email/Number
                </Link>
                
                <div className='text-center'> Don't have an account? <Link className='font-bold underline text-black' to={"/signup"}>Sign up</Link> </div>
            </div>
        </div>
    )
}

export default Login