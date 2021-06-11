import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import plane from "../../uploads/logo.jpg"
import ApiTours from "../views/tours/ApiTours"
import ApiTours_Images from "../views/tours_images/ApiTours_Images"

export default function Detail({ match }) {

    //find one Tours
    const [tours, setTours] = useState([])
    const [toursimage, setToursImage] = useState([])

    /*   const onAdd = {tours} => {
          const exist = tours.findOne(tours => tours.id === tours.id)
          if(exist) {
  
          }
      } */

    useEffect(() => {
        ApiTours.findOne(match.params.id).then(data => {
            setTours(data)
        })
        /*             ApiTours_Images.list().then(data => {
                        setToursImage(data)
                    }) */
    }, [])

    return (
        <>
            <body className="antialiased" x-data="{ isOpen : false}">
                <header className="header  mb-50 bg-gray-800" >
                    <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
                        <div className="header-wrapper flex items-center justify-between">
                            <Link to="/tr">
                                <img src={plane} alt="logo" />
                            </Link>
                            <navbar className="navbar hidden md:block">
                                <ul className="flex space-x-8 text-sm font-semibold">
                                    <li>
                                        <Link to="/tr/landing">
                                            <span className="text-gray-200">Home</span>
                                        </Link>
                                    </li>
                                    {/*  <li>
                                        <Link to="/tr/login">
                                            <span className="text-gray-200">Login</span>
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link to="/tr/register">
                                            <span className="text-gray-200">Sign Out</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/tr/cart/" + tours.tour_id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </Link>
                                    </li>
                                </ul>
                            </navbar>
                        </div>
                    </div>
                </header>

                {/* <!-- component DETAIL --> */}
                <body className="antialiased">
                    <div className="bg-white shadow-sm sticky top-0">
                        <div className="py-2">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                                <div className="flex flex-col md:flex-row -mx-4">
                                    <div className="md:flex-1 px-4">
                                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">

                                            {tours.tours_images && tours.tours_images.map((data) => {
                                                return (
                                                    <img src={`/api/tours_images/photo/` + data.toim_filename}
                                                        alt={`${tours.tour_id}`}
                                                        className="rounded-lg w-full h-40v overflow-hidden object-cover" />
                                                )
                                            })}
                                            
                                        </div>
                                    </div>

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
                                                <Link to={"/tr/cart/" + tours.tour_id}>
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
                <div className="bg-gray-900">
                    <footer className="flex flex-wrap items-center justify-between p-3 m-auto">
                        <div className="container mx-auto flex flex-col flex-wrap items-center justify-between">
                            <ul className="flex mx-auto text-white text-center">
                                <li className="p-2 cursor-pointer hover:underline">Terms & Conditions</li>
                                <li className="p-2 cursor-pointer hover:underline">Privacy</li>
                                <li className="p-2 cursor-pointer hover:underline">Cookies</li>
                            </ul>
                            <ul className="flex mx-auto text-white text-center">
                                <li className="p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg></li>
                                <li className="p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" width="24" height="24" viewBox="0 0 24 24"><path d="M21.231 0h-18.462c-1.529 0-2.769 1.24-2.769 2.769v18.46c0 1.531 1.24 2.771 2.769 2.771h18.463c1.529 0 2.768-1.24 2.768-2.771v-18.46c0-1.529-1.239-2.769-2.769-2.769zm-9.231 7.385c2.549 0 4.616 2.065 4.616 4.615 0 2.549-2.067 4.616-4.616 4.616s-4.615-2.068-4.615-4.616c0-2.55 2.066-4.615 4.615-4.615zm9 12.693c0 .509-.413.922-.924.922h-16.152c-.511 0-.924-.413-.924-.922v-10.078h1.897c-.088.315-.153.64-.2.971-.05.337-.081.679-.081 1.029 0 4.079 3.306 7.385 7.384 7.385s7.384-3.306 7.384-7.385c0-.35-.031-.692-.081-1.028-.047-.331-.112-.656-.2-.971h1.897v10.077zm0-13.98c0 .509-.413.923-.924.923h-2.174c-.511 0-.923-.414-.923-.923v-2.175c0-.51.412-.923.923-.923h2.174c.511 0 .924.413.924.923v2.175z" fillRule="evenodd" clipRule="evenodd" /></svg></li>
                                <li className="p-2 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-white" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></li>
                            </ul>
                            <div className="flex mx-auto text-white text-center">
                                Copyright Tour Travel © 2021
                            </div>
                        </div>
                    </footer>
                </div>

            </body>

        </>
    );
}
