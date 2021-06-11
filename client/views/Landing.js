import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import plane from "../../uploads/logo.jpg"
import ApiTours from "../views/tours/ApiTours"


export default function Landing() {

    const [tours, setTours] = useState([])
    
    useEffect(() => {
        ApiTours.list().then(data => {
            setTours(data)
        })
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
                                    {/* <li>
                                        <Link to="/tr/login">
                                            <span className="text-gray-200">Login</span>
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link to="/tr/register">
                                            <span className="text-gray-200">Sign Out</span>
                                        </Link>
                                    </li>
                                </ul>
                            </navbar>
                        </div>
                    </div>
                </header>

                <div className="hero bg-cover  bg-clip-padding pb-20"
                    style={{
                        backgroundImage: `url("https://blog.bestbuy.ca/wp-content/uploads/2015/12/38013i8A8AC5906CB45B8C.jpg")`
                    }}>
                    <div className="container px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
                        <div className="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            <div className="hero-text col-span-6 pt-10">
                                <h1 className=" font-bold text-4xl md:text-5xl max-w-xl text-gray-900 leading-tight">Don't listen to what they say, Go See</h1>
                                <hr className=" w-12 h-1 bg-orange-500 rounded-full mt-8" />
                                <p className="text-gray-900 text-base leading-relaxed mt-2 font-semibold">Your ultimate travel companion. Carries all the information you need while travelling</p>

                                <div className="get-app">
                                    <a href="https://www.apple.com/app-store/">
                                        <div className="flex mt-3 w-48 h-14 bg-transparent text-black border border-black rounded-xl items-center justify-center">
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
                                        <div className="flex mt-3 w-48 h-14 bg-transparent text-black border border-black rounded-xl items-center justify-center">
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
                    <div className="relative items-center justify-center">
                        <h1 className="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-400">
                            Choose Your Next Tour
                        </h1>
                    </div>
                </div>

                <div class="bg-gray-300 bg-cover flex flex-wrap justify-center items-center gap-3 py-5">
                    {/* Tour componnets*/}
                    {tours && tours.map((row, index) => {
                        return (
                            <tr key={index}>
                                <div class="w-56 h-1/2 bg-cover bg-white shadow-lg rounded-lg overflow-hidden my-10">
                                    <div class="px-4 py-2">
                                        <h1 class="text-gray-900 font-bold text-3xl uppercase">
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
                                    <img src={require("../../uploads/" + row.tours_images[0].toim_filename).default}
                                        alt={`${row.tour_id}`}
                                        className="rounded-t w-full h-40v overflow-hidden object-cover"
                                    />

                                    <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
                                        <h1 class="text-gray-200 font-bold text-xl">
                                            {row.tour_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                        </h1>
                                        <Link to={"/tr/detail/" + row.tour_id}>
                                            <button class="w-16 h-8 px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded bg-cover">
                                                Detail
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </tr>
                        )
                    })}
                </div>

               
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
