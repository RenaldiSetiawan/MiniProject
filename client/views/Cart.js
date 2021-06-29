import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import NavigationBar from "../components/layout/NavigationBar"
import Footer from "../components/layout/Footer"
import ApiLineItems from "./lineitems/ApiLineItems"
import ApiTours from "../views/tours/ApiTours"
import ApiCart from './cart/ApiCart';

export default function Cart() {

    const [lite, setLite] = useState([])
    const [tours, setTours] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        ApiTours.list().then(data => {
            setTours(data)
        })

        ApiLineItems.list().then(data => {
            setLite(data)
        })

        ApiCart.list().then(data => {
            setCart(data)
        })

    }, [])

    const onDelete = async (lite_id) => {
        ApiLineItems.remove(lite_id).then(result => {
            location.reload();
            console.log(result);
            setStatus(true)
        })
    }


    if (lite) {
        console.log(lite);
    }

    if (tours) {
        console.log(tours);
    }

    if (cart) {
        console.log(cart);
    }

    // cek array
    // const onClick = () => {
    //     console.log(tours, lite)
    // }

    return (
        <>
            <NavigationBar />
            {/* <!-- component --> */}
            <div class="bg-gray-300 pb-96 pt-8 h-screen w-screen">
                {lite && lite.map((row, index) => {
                    const item = tours && tours.find(x => x.tour_id === row.lite_tour_id)
                    const qty = lite && lite.find(x => x.lite_id === row.lite_id)
                    return (
                        <tr key={index}>
                            <div class="grid grid-cols-12 gap-6 ml-60">
                                <div class="col-span-12 lg:col-span-8 ">
                                    <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4 h- h-20v">
                                        <div class="flex justify-between px-4 items-center">
                                         
                                            <img src={item && "/api/tours_images/photo/" + item.tours_images[2].toim_filename} 
                                             className="block pr-px w-40 h-30 rounded-lg bg-cover"/>
                                            
                                            <div class="text-lg font-semibold pl-16">
                                                <p class="pr-28 font-serif">Product:</p>
                                                <h3 className="font-mono underline">{item && item.tour_name}</h3>
                                            </div>

                                            <form action="" method="DELETE">
                                                <div class="text-lg font-semibold pl-10">
                                                    <button type="submit"
                                                        class="focus:outline-none bg-red-600 text-white font-bold py-2 px-2 rounded-full inline-flex items-center"
                                                        onClick={() => {
                                                            location.reload();
                                                            if (window.confirm("Are you sure you wish to delete this item?")
                                                            )
                                                                onDelete(row.lite_id)
                                                        }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4 ">
                                    <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                                        {/* <!-- classic add --> */}
                                        <div class="flex justify-between border-b-4 border-red-600 mb-2">
                                            <div class="text-lg py-2 font-serif font-semibold">
                                                <p>Number of people</p>
                                            </div>
                                            <div class="text-lg py-2">
                                                <div class="flex flex-row space-x-2 w-full items-center rounded-lg">
                                                    <p>{qty && qty.lite_qty}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- End classic add --> */}
                                        {/* <!-- Total Item --> */}
                                        <div class="flex justify-between">
                                            <div class="text-lg py-2 font-semibold font-serif">
                                                <p>Price</p>
                                            </div>
                                            <div class="text-lg py-2">
                                                <div class="flex flex-row space-x-2 w-full items-center rounded-lg font-mono">
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
                <Link to="/tourtravel/order">
                    <button class="flex justify-center w-4/6 py-3 mt-2 mx-60 font-bold text-black uppercase bg-gray-100 rounded-full shadow item-center focus:shadow-outline focus:outline-none">
                        <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                        <span class="ml-2 mt-5px font-serif">Checkout</span>
                    </button>
                </Link>
            </div>
            {/* <!-- END COMPONENT --> */}
            <Footer />
        </>
    );
}
