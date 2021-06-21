import React, { useState } from 'react'
import { Link } from "react-router-dom";
import plane from '../../../uploads/logo.jpg'
import { useLocation, useHistory } from 'react-router-dom';

export default function NavigationBar(props) {

    const location = useLocation()
    const history = useHistory()

    const redirect = location.search
        ? new URLSearchParams(location.search).length("redirect")
        : '/tourtravel/login';

    const onSubmit = () => {
        localStorage.clear();
        history.push(redirect)
    }

    return (
        <>
            <header className="header  mb-50 bg-gray-800" >
                <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
                    <div className="header-wrapper flex items-center justify-between">
                        <Link to="/tourtravel/landing">
                            <img src={plane} alt="logo" />
                        </Link>
                        <navbar className="navbar hidden md:block">
                            <ul className="flex space-x-8 text-sm font-semibold">
                                <li>
                                    <Link to="/tourtravel/landing">
                                        <span className="text-gray-200">Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tourtravel/profile">
                                        <span className="text-gray-200">Profile</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tourtravel/cart">
                                        <span className="text-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tourtravel/login">
                                        <span className="text-gray-200">Signin</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link>
                                        <span className="text-gray-200"
                                            onClick={() => {
                                                if (
                                                    window.confirm(
                                                        "Are you sure want to Signout?"
                                                    )
                                                )
                                                    onSubmit()
                                            }}>
                                            Sign Out
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </navbar>
                    </div>
                </div>
            </header>
        </>
    )
}
