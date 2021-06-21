import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import NavigationBar from "../components/layout/NavigationBar"
import Footer from "../components/layout/Footer"
import ApiTours from "../views/tours/ApiTours"
import ApiTours_Images from "../views/tours_images/ApiTours_Images"
import { liteInput } from "../views/action/shopAction"

export default function Detail({ match }) {

    const [tours, setTours] = useState([])
    const [toursimages, setToursImages] = useState([])

    useEffect(() => {
        ApiTours.findOne(match.params.id).then(data => {
            setTours(data)
        }),
            ApiTours_Images.findOne(match.params.id).then(data => {
                setToursImages(data)
            })
    }, [])

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [values, setValues] = useState({
        user_id: undefined,
        tour_id: undefined,
        lite_qty: 1
    })

    const handleOnChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.values })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            user_id: parseInt(userInfo.users.user_id),
            tour_id: parseInt(tours.tour_id),
            lite_qty: parseInt(values.lite_qty)
        }
        
        console.log(data);

        dispatch(liteInput(data)).then((result) => {
            console.log(data);
            window.location = "/tourtravel/cart"
        })
    }

    

    return (
        <>
            <body className="antialiased bg-gray-100" x-data="{ isOpen : false}">

                <NavigationBar />

                {/* <!-- component DETAIL --> */}
                <div class="md:pl-10 pr-6 pt-10 rounded-tl-lg ">
                    <div class="flex flex-wrap no-underline text-black h-64 overflow-hidden">
                        {/* <!-- component images --> */}
                        <div class="md:w-8/12 h-full">
                            {tours.tours_images &&
                                <img src={`/api/tours_images/photo/` + tours.tours_images[0].toim_filename}
                                    alt={`${tours.tour_id}`}
                                    className="block pr-px w-full h-full rounded-l-lg md:bg-cover border-r-2"
                                    style={{ minHeight: "60vh" }}
                                />
                            }
                        </div>
                        {/* <!-- component images --> */}
                        <div class="w-96 h-3/6">
                            {tours.tours_images &&
                                <img src={`/api/tours_images/photo/` + tours.tours_images[1].toim_filename}
                                    alt={`${tours.tour_id}`}
                                    className="block pr-px w-full h-full rounded-tr-lg border-l-2 border-b-2 bg-cover border-r-2"
                                    style={{ minHeight: "39vh" }}
                                />
                            }
                            {/* <!-- component images --> */}
                            <div class="h-30">
                                {tours.tours_images &&
                                    <img src={`/api/tours_images/photo/` + tours.tours_images[2].toim_filename}
                                        alt={`${tours.tour_id}`}
                                        className="block pr-px w-full h-full rounded-br-lg bg-cover border-l-2 border-t-2"
                                        style={{ minHeight: "39vh" }}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Code Tours */}
                {tours &&
                    <div className="md:flex-1 px-10 pt-6">
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
                                <p className="text-green-500 text-xl font-semibold">Save to 15%</p>
                            </div>
                        </div>

                        <p className="text-gray-500"> {tours.tour_description} </p>
                        
                        <div className="flex py-4 space-x-4">
                            <div className="relative">
                                <p className="text-gray-500 text-sm " onChange={handleOnChange('lite_qty')}>QTY | Perperson</p>
                                <input className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1"
                                       type="number" />

                               
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

                            <button type="button"
                                className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                                onClick={onSubmit}>
                                Add to Cart
                            </button>

                            {/* <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-red-600 hover:bg-red-600 text-white">
                                Beli Sekarang
                            </button> */}
                        </div>
                    </div>
                }

                {/* FOOTER */}
                <Footer />

            </body>
        </>
    );
}
