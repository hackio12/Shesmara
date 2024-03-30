import React, { useEffect, useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletesUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';
import logo from '../images/logo.png';

export default function Header() {
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showSignOutModal, setShowSignOutModal] = useState(false); // State for sign-out modal
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileDropdownRef = useRef(null); // Ref for profile dropdown

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [window.location.search]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false); // Close dropdown if clicked outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileDropdownRef]);

    const handleProfileClick = () => {
        if (currentUser) {
            setShowProfileDropdown(!showProfileDropdown); // Toggle profile dropdown
        } else {
            setShowProfileDropdown(false);
            navigate('/sign-in');
        }
    };

    const handleSignOut = () => {
        setShowSignOutModal(true); // Display sign-out modal
    };

    const handleSignOutConfirmed = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(deletesUserFailure(data.success));
                return;
            }
            dispatch(signOutUserSuccess(data));
            setShowSignOutModal(false);
            // Navigate to the sign-in page after signing out
            navigate('/sign-In');
        } catch (error) {
            dispatch(deletesUserFailure(data.success));
        }
    };

    const handleSignOutCanceled = () => {
        setShowSignOutModal(false);
    };

    const renderProfileButton = () => {
        if (currentUser) {
            return (
                <img className='w-10 h-10 sm:w-12 sm:h-12 overflow-hidden border-2 border-gray-400 rounded-full' src={currentUser.avatar} alt='profile' />
            );
        } else {
            return (
                <span className='px-3 py-2 mx-3 mt-2 text-black-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-black-500  hover:underline'>Sign-in</span>
            );
        }
    };

    return (
        <header className='relative bg-white shadow-none'>
                <div className="flex items-center justify-between">
                    <div className="inline-block">
                        <Link to='/'>
                            <img className="w-42 h-28 sm:w-30 sm:h-30 p-2" src={logo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-lg flex items-center mr-4">
                            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-60'
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button>
                                <FaSearch className='text-slate-600' />
                            </button>
                        </form>
                        <ul className='flex gap-4 items-center'>
                            <Link to='/' className='p-2'>
                                <li className='hidden sm:inline text-slate-700 hover:underline'>
                                    Home
                                </li>
                            </Link>
                            <Link to='/about' className='p-2'>
                                <li className='hidden sm:inline text-slate-700 hover:underline'>
                                    About
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="relative" ref={profileDropdownRef}>
                        <button onClick={handleProfileClick} className="flex items-center justify-center">
                            {renderProfileButton()}
                        </button>
                        {currentUser && showProfileDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                                <Link to='/profile' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Profile</Link>
                                <button onClick={handleSignOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Sign Out</button>
                                <Link to='/settings' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">Settings</Link>
                            </div>
                        )}
                    </div>
                </div>
            {/* Sign-out modal */}
            {showSignOutModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg">
                        <p>Are you sure you want to sign out?</p>
                        <div className="mt-4 flex justify-end">
                            <button onClick={handleSignOutCanceled} className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancel</button>
                            <button onClick={handleSignOutConfirmed} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Sign Out</button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
