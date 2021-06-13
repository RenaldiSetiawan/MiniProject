import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavigationBar from "../components/layout/NavigationBar"
import Footer from "../components/layout/Footer"
import ApiTours from "../views/tours/ApiTours"

export default function Detail({ match }) {

    //find one Tours
    const [tours, setTours] = useState([])

    useEffect(() => {
        ApiTours.findOne(match.params.id).then(data => {
            setTours(data)
        })
    }, [])

    

    return (
        <>
            <body className="antialiased" x-data="{ isOpen : false}">
                
                <NavigationBar/>

                {/* <!-- component DETAIL --> */}
                <body className="antialiased">
                    <div className="bg-white shadow-sm sticky top-0">
                        <div className="py-2">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                                <div className="flex flex-col md:flex-row -mx-4">
                                   
                                        
                                            {tours.tours_images && tours.tours_images.map((data) => {
                                                return (
                                                    <img src={`/api/tours_images/photo/` + data.toim_filename}
                                                        alt={`${tours.tour_id}`}
                                                        className="md:flex-1 h-80 md:h-80 rounded-lg mb-4 object-cover" />
                                                )
                                            })}
                                     
                                    

                                    {tours &&
                                        <div className="md:flex-1 px-4">
                                            <h2 className="mb-2 leading-tight tracking-tight font-bold font-serif text-gray-800 text-2xl md:text-3xl">
                                                {tours.tour_name}
                                            </h2>
                                            {/* Bintang Review */}
                                            <span class="flex items-center">
                                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <span class="text-gray-600 ml-3">4 Reviews</span>
                                            </span>
                                            <p className="text-gray-600 text-sm ">Route</p>
                                            <a className="text-indigo-600 hover:underline">{tours.tour_route}</a>
                                            <p className="text-gray-600 text-sm ">Package</p>
                                            <a className="text-indigo-600 hover:underline">{tours.tour_package}</a>
                                            <p className="text-gray-600 text-sm ">Schedule</p>
                                            <input
                                                type="Date"
                                                className="block border border-grey-light w-auto p-3 rounded mb-4"
                                                name="birthdate"
                                                placeholder="Birth Date"
                                            />

                                            <div className="flex items-center space-x-4 my-4">
                                                <div>
                                                    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                                        <span className="text-indigo-400 mr-1 mt-1">Rp</span>
                                                        <span className="font-bold text-indigo-600 text-3xl">
                                                            {tours.tour_price && tours.tour_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}

                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                                                    <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                                                </div>
                                            </div>

                                            <p className="text-gray-500"> {tours.tour_description} </p>

                                            {/* List Hotel adn Pesawat*/}
                                            <div className="flex py-4 space-x-4">
                                                <div className="relative">
                                                    <p className="text-gray-500 text-sm ">Hotel</p>
                                                    <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </select>
                                                    <svg className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
                                                </div>

                                                <div className="relative">
                                                    <p className="text-gray-500 text-sm ">Pesawat</p>
                                                    <select className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                                                        <option>Garuda</option>
                                                        <option>Cathay</option>
                                                        <option>Nippon Air</option>
                                                    </select>
                                                    <svg className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
                                                </div>
                                                <Link to={"/tourtravel/cart/" + tours.tour_id}>
                                                    <button type="button" className="w-5/6 h-1/2 px-2 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                                                        Masukan Keranjang
                                                    </button>
                                                </Link>
                                                <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-red-600 hover:bg-red-600 text-white">
                                                    Beli Sekarang
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </body>

                {/* FOOTER */}
                <Footer/>

            </body>

        </>
    );
}
