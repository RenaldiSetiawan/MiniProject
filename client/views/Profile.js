import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavigationBar from '../components/layout/NavigationBar';
import Footer from '../components/layout/Footer';
import { useDispatch, useSelector } from "react-redux";
import ApiOrders from './orders/ApiOrders'
import ApiCart from './cart/ApiCart'
import ApiTours from './tours/ApiTours';
import ApiLineItems from './lineitems/ApiLineItems';
import { UsersIcon } from '@heroicons/react/solid';

export default function Profile({ match }) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [orders, setOrders] = useState([])
    const [cart, setCart] = useState([])
    const [tours, setTours] = useState([])
    const [lite, setLite] = useState([])

    useEffect(() => {
        ApiOrders.list().then(data => {
            setOrders(data)
        })
        ApiCart.list().then(data => {
            setCart(data)
        })
        ApiTours.list().then(data => {
            setTours(data)
        })
        ApiLineItems.list().then(data => {
            setLite(data)
        })
    }, [])

    if (orders, cart) {
        console.log(orders, cart);
    }

    return (
        <>
            <NavigationBar />
            {/* <!-- component --> */}
            <div class="w-screen max-h-full space-y-8 p-10 bg-gray-300">
                {orders && orders.map((row, index) => {
                    return (
                        <tr key={index}>
                            <div class="grid gap-8 grid-cols-1">
                                <div class="flex flex-col ">
                                    <div class="flex flex-col sm:flex-row items-center">
                                        <h2 class="font-semibold text-lg ml-1 text-black font-serif">Profile Info</h2>
                                    </div>
                                    <div class="mt-2">
                                        <div class="form">
                                            <img class="w-28 h-28 p-1 bg-white rounded-full"
                                                src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
                                                alt="" />
                                            <div class="flex p-3 border-l-8 border-white">
                                                <div class="space-y-1 border-r-4 border-white pr-3">
                                                    <div class="text-lg leading-5 font-semibold pt-2">
                                                        <span class="text-lg leading-4 font-normal text-black font-serif">Data Order </span>{row.order_name}</div>
                                                    <div class="text-lg leading-5 font-semibold">
                                                        <span class="text-lg leading-4 font-normal text-black font-serif pr">Created On </span>
                                                        {row.order_created_on}
                                                    </div>
                                                </div>
                                                <div class="flex-1">
                                                    <div class="ml-3 space-y-1 border-r-4 border-white pr-3">
                                                        <h1 class="mb-1 italic text-lg font-semibold font-serif flex text-black"> Name:
                                                            <h2 className="pl-2 font-semibold font-mono underline">{userInfo.users.user_name}</h2>
                                                        </h1>
                                                        <h1 class="mb-1 italic text-lg font-semibold font-serif flex text-black"> Email:
                                                            <h2 className="pl-2 font-semibold font-mono underline">{userInfo.users.user_email}</h2>
                                                        </h1>
                                                        <h1 class="mb-1 italic text-lg font-semibold font-serif flex text-black"> City:
                                                            <h2 className="pl-2 font-semibold font-mono underline">{row.order_city}</h2>
                                                        </h1>
                                                        <h1 class="mb-1 italic text-lg font-semibold font-serif flex text-black"> Address:
                                                            <h2 className="pl-2 font-semibold font-mono underline">{row.order_address}</h2>
                                                        </h1>
                                                    </div>
                                                </div>
                                                <button >
                                                    <div class="ml-3 my-10 bg-blue-600 p-1 w-20">
                                                        <div class="uppercase text-xs leading-4 font-semibold text-center text-yellow-100">
                                                            Order Success
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </tr>
                    )
                })}
            </div>
            <div className="bg-gray-300">
                {lite && lite.map((row, index) => {
                    const item = tours && tours.find(x => x.tour_id === row.lite_tour_id)
                    const qty = lite && lite.find(x => x.lite_id === row.lite_id)
                    return (
                        <tr>
                            <div class="grid grid-cols-12 gap-6 ml-1">
                                <div class="col-span-12 lg:col-span-8 ">
                                    <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4 h- h-20v mr-0">
                                        <div class="flex justify-between px-4 items-center">
                                            <img src={item && "/api/tours_images/photo/" + item.tours_images[2].toim_filename}
                                                className="block pr-px w-40 h-30 rounded-lg bg-cover"
                                            />
                                            <div class="text-lg font-semibold pl-16 text-black">
                                                <p class="pr-28 font-serif">Product:</p>
                                                <h3 className="font-mono underline">{item && item.tour_name}</h3>
                                            </div>
                                            <div class="text-lg font-semibold pl-10">
                                                <button type="submit"
                                                    class="focus:outline-none bg-green-500 text-white font-bold py-2 px-2 rounded-full inline-flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4 ">
                                    <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                                        {/* <!-- classic add --> */}
                                        <div class="flex justify-between border-b-4 border-green-500 mb-2">
                                            <div class="text-lg py-2 font-semibold font-serif text-black">
                                                <p>Number of people</p>
                                            </div>
                                            <div class="text-lg py-2">
                                                <div class="flex flex-row space-x-2 w-full items-center rounded-lg">
                                                    <p className="text-black">{qty && qty.lite_qty}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- End classic add --> */}
                                        {/* <!-- Total Item --> */}
                                        <div class="flex justify-between">
                                            <div class="text-lg py-2 font-semibold font-serif text-black">
                                                <p>Price</p>
                                            </div>
                                            <div class="text-lg py-2">
                                                <div class="flex flex-row space-x-2 w-full items-center rounded-lg text-black font-mono">
                                                    <p>Rp {item && item.tour_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- End Total Item --> */}
                                    </div>
                                </div>
                            </div>
                        </tr>
                    )
                })
                }
            </div>
            <Footer />
        </>
    );
}
