import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavigationBar from "../components/layout/NavigationBar"
import Footer from "../components/layout/Footer"
import ApiTours from "../views/tours/ApiTours"

export default function Landing() {

    const [tours, setTours] = useState([])

    useEffect(() => {
        ApiTours.list().then(data => {
            setTours(data)
        })
    }, [])

    if (tours) {
        console.log(tours);
    }
    return (
        <>
            <body className="antialiased" x-data="{ isOpen : false}">
                <NavigationBar />
                {/* BG Home */}
                <div className="hero bg-fixed bg-cover py-32"
                    style={{
                        backgroundImage: `url("https://www.concadelsogno.it/uploads/gallery/images/2_093268aaaff584d1de1f0cba072b513d.jpg")`
                    }}>
                    <div className="container sm:px-8 lg:px-16 xl:px-20 mx-auto">
                        <div className="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            <div className="hero-text col-span-6 pb-20">
                                <h1 className=" font-bold text-4xl md:text-5xl max-w-xl text-white leading-tight">Don't listen to what they say, Go See</h1>
                                <hr className=" w-12 h-1 bg-orange-500 rounded-full mt-8" />
                                <p className="text-white text-base leading-relaxed mt-2 font-semibold">Your ultimate travel companion. Carries all the information you need while travelling</p>

                                <div className="get-app">
                                    <a href="https://www.apple.com/app-store/">
                                        <div className="flex mt-3 w-48 h-14 bg-transparent text-white border border-white rounded-xl items-center justify-center">
                                            <div className="mr-3">
                                                <svg viewBox="0 0 384 512" width="30" >
                                                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs">Download on the</div>
                                                <div className="text-2xl font-semibold font-sans -mt-1">App Store</div>
                                            </div>
                                        </div>
                                    </a>

                                    <a href="https://play.google.com/store">
                                        <div className="flex mt-3 w-48 h-14 bg-transparent text-white border border-white rounded-xl items-center justify-center">
                                            <div className="mr-3">
                                                <svg viewBox="30 336.7 120.9 129.2" width="35">
                                                    <path fill="#FFD400" d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7  c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z" />
                                                    <path fill="#FF3333" d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3  c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z" />
                                                    <path fill="#48FF48" d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1  c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z" />
                                                    <path fill="#3BCCFF" d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6  c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs">Get it on</div>
                                                <div className="text-2xl font-semibold font-sans -mt-1">Google Play</div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="relative items-center justify-center pt-15">
                        <h1 className="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-200">
                            Choose Your Next Tour
                        </h1>
                    </div>
                </div>
                <div class="bg-gray-300 bg-cover flex flex-wrap justify-center items-center gap-3 py-5 ">
                    {/* Tour componnets*/}
                    {tours && tours.map((row, index) => {
                        return (
                            <tr key={index}>
                                <Link to={"/tourtravel/detail/" + row.tour_id}>
                                    <div class="w-60 h-1/2 bg-cover bg-white shadow-lg rounded-lg overflow-hidden my-1">
                                        <div class="px-4 py-2">
                                            <h1 class="text-gray-900 font-bold text-2xl uppercase">
                                                {row.tour_name}
                                            </h1>
                                            {/* Bintang Review */}
                                            <span class="flex items-center">
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                </svg>
                                            </span>

                                            <div class="flex items-center mt-4 text-black font-semibold" >
                                                <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
                                                    <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
                                                </svg>
                                                <h1 class="px-2 text-sm">
                                                    {row.tour_route}
                                                </h1>
                                            </div>
                                        </div>

                                        {/* TOUR IMAGES */}
                                        <img src={require("../../uploads/" + row.tours_images[2].toim_filename).default}
                                            alt={`${row.tour_id}`}
                                            className="rounded-t w-full h-30v md:overflow-hidden object-cover"
                                        />
                                        
                                        <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
                                            <h1 class="text-gray-200 font-bold text-xl">
                                                {row.tour_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                            </h1>
                                            <button class="w-16 h-8 px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded bg-cover"
                                                onClick={() => addToCart(tours + id)}>
                                                Detail
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </tr>
                        )
                    })}
                </div>
                {/* Pagination */}
                <div className="bg-gray-300 bg-cover flex flex-wrap justify-center items-center gap-3 py-5 ">
                    <ul class="flex">
                        <li class="mx-1 px-3 py-2 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                            <a class="flex items-col font-bold" href="#">
                                <span class="mx-1">previous</span>
                            </a>
                        </li>
                        <li class="mx-1 px-3 py-2 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                            <a class="font-bold" href="#">1</a>
                        </li>
                        <li class="mx-1 px-3 py-2 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                            <a class="font-bold" href="#">2</a>
                        </li>
                        <li class="mx-1 px-3 py-2 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                            <a class="font-bold" href="#">3</a>
                        </li>
                        <li class="mx-1 px-3 py-2 bg-white text-gray-900 hover:bg-gray-700 hover:text-gray-200 rounded-lg">
                            <a class="flex items-center font-bold" href="#">
                                <span class="mx-1">Next</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <Footer />
            </body>

        </>
    );
}
