import React from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <header className='relative bg-white shadow '>
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <Link to='/'>
                            <img className="w-auto h-6 sm:h-7" src="" alt="Logo" />
                        </Link>
        </div>
        <ul className='flex gap-3'>
            <Link to='/'>
            <li className='px-3 py-2 mx-3 mt-2 text-black-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-black-500 hover:bg-gray-100 dark:hover:bg-gray-200'>Home</li></Link>
            <Link to='/about'>
            <li className='px-3 py-2 mx-3 mt-2 text-black-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-black-500 hover:bg-gray-100 dark:hover:bg-gray-200'>About</li></Link>
            <Link to='/profile'>
                {currentUser? (
                    <img className='w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full' src={currentUser.avatar} alt='profile' />

                ):( <li className='px-3 py-2 mx-3 mt-2 text-black-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-black-500  hover:underline'>Sign-in</li>
                )}
            </Link>
        </ul>
        </div>
        </div>
    </header>
  )
}
