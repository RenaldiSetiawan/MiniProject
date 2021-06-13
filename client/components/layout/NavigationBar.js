import React, { useState } from 'react'
import { Link } from "react-router-dom";
import plane from  '../../../uploads/logo.jpg'

export default function NavigationBar(props) {
   

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
                                        <Link to="/tourtravel/register">
                                            <span className="text-gray-200">Sign Out</span>
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
