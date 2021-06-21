import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavigationBar from '../components/layout/NavigationBar';
import Footer from '../components/layout/Footer';
import ApiUsers from '../views/users/ApiUsers'

export default function Profile({ match }) {

    /* const [users, setUsers] = useState([])

    useEffect(() => {
        ApiUsers.findOne(match.params.id).then(data => {
            setTours(data)
        })

    }, []) */

    return (
        <>
            <NavigationBar />
            {/* <!-- component --> */}
                <div class="w-screen space-y-8 p-10 bg-gray-300 shadow-lg z-10 mt-0">
                    <div class="grid  gap-8 grid-cols-1">
                        <div class="flex flex-col ">
                            <div class="flex flex-col sm:flex-row items-center">
                                <h2 class="font-semibold text-lg mr-auto">Profile Info</h2>
                            </div>
                            <div class="mt-1">
                                <div class="form">
                                    <img class="w-28 h-28 p-1 bg-white rounded-full" src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="" />
                                    <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                                        <div class="mb-3 space-y-2 w-full text-xs">
                                            <label class="font-semibold text-gray-600 py-2">Full Name</label>
                                            <p class="text-lg">Name</p>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                                        <div class="mb-3 space-y-2 w-full text-xs">
                                            <label class="font-semibold text-gray-600 py-2">Email</label>
                                            <p class="text-lg">Name</p>
                                            <hr></hr>
                                        </div>
                                    </div>
                                    <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                                        <div class="mb-3 space-y-2 w-full text-xs">
                                            <label class="font-semibold text-gray-600 py-2">Birth Date</label>
                                            <p class="text-lg">Name</p>
                                            <hr></hr>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
       
            {/* <--End Componnets--> */}
            <Footer />
        </>
    );
}
