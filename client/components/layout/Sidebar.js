import React from 'react'
import { Link } from "react-router-dom";
import plane from "../../../uploads/logo.jpg"


export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    return (
        <>
            <nav className="h-screen flex flex-col w-48 pb-96 bg-none">
                <ul className="p-4 pt-4 space-y-2 flex-1 overflow-auto" >
                    <li>
                        <Link to="/tourtravel/tours" className="flex space-x-2 items-center text-white p-2 bg-gray-800 rounded-lg transform hover:translate-x-2 transition-transform ease-in duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-white" >Tours</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/tourtravel/toursimages" className="flex space-x-2 items-center text-white p-2 bg-gray-800 rounded-lg transform hover:translate-x-2 transition-transform ease-in duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-white">Tours Images</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}