import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavigationBar from '../components/layout/NavigationBar';
import Footer from '../components/layout/Footer';
// import ApiUsers from '../views/users/ApiUsers'

export default function Profile({ match }) {

    /* const [users, setUser] = useState([])

    useEffect(() => {
        ApiUsers.findOne(match.params.id).then(data => {
            setUser(data)
        })
    }, [])
 */
    return (
        <>
            <NavigationBar />
            <div class="container mx-auto my-5 p-5">
                <div class="md:flex no-wrap md:-mx-2 ">
                    {/* <!-- Left Side --> */}
                    <div class="w-full md:w-3/12 md:mx-2">
                        {/* <!-- Profile Card --> */}
                        <div class="bg-white p-3 border-t-4 border-green-400">
                            <div class="image overflow-hidden">
                                <img class="h-auto w-full mx-auto"
                                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                    alt="" />
                            </div>

                            <ul
                                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li class="flex items-center py-3">
                                    <span>Status</span>
                                    <span class="ml-auto"><span
                                        class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                </li>
                            </ul>


                        </div>
                        {/* <!-- End of profile card --> */}
                    </div>

                    {/* <!-- Right Side --> */}
                    <div class="w-full md:w-9/12 mx-2 h-64">

                        {/* <!-- About Section --> */}
                        {/* {users &&  */}
                        <div class="bg-gray-100 p-3 shadow-sm rounded-sm">
                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </span>
                            <span class="tracking-wide">Profile</span>
                        </div>
                        <div class="text-gray-700">
                            <div class="grid md:grid-cols-2 text-sm">
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Name</div>
                                    <div class="px-4 py-2">{}</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Gender</div>
                                    <div class="px-4 py-2">Female</div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Email.</div>
                                    <div class="px-4 py-2">
                                        <a class="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                    </div>
                                </div>
                                <div class="grid grid-cols-2">
                                    <div class="px-4 py-2 font-semibold">Birthday</div>
                                    <div class="px-4 py-2">Feb 06, 1998</div>
                                </div>
                            </div>
                        </div>
                    </div>
                        {/* // } */}
                        
                        {/* <!-- End of about section --> */}

                        {/* <!-- End of profile tab --> */}
                    </div>
                </div>
            </div>
            <Footer />

        </>
    );
}
