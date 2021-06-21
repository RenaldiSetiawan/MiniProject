import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import NavigationBar from '../components/layout/NavigationBar';
import Footer from '../components/layout/Footer';
import ApiOrders from './orders/ApiOrders'

export default function BayarOrder() {


    const [orders, setOrders] = useState([])

    useEffect(() => {

        ApiOrders.list().then(data => {
            setOrders(data)
        })

    }, [])

    if (orders) {
        console.log(orders);
    }

    return (
        <>
            <NavigationBar />

            {/* <!-- COMPONENT CART--> */}
            <div class="flex justify-center my-1 pb-1 ">
                {/* <div><button onClick={onClick}>Check</button></div> */}
                <div class="flex flex-col w-full p-8 text-gray-800 bg-white">
                    <div class="flex-1">
                        {/* <table class="w-full text-sm lg:text-base" cellspacing="0">
                            <thead>
                                <tr class="h-12 uppercase">
                                    <th class="hidden md:table-cell"></th>
                                    <th class="text-left">
                                        Product
                                    </th>
                                    <th class="lg:text-right text-left pl-5 lg:pl-0">
                                        <span class="lg:hidden" title="Quantity">Qty</span>
                                        <span class="hidden lg:inline">Quantity</span>
                                    </th>
                                    <th class="text-right">
                                        Total price
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {lite && lite.map((row, index) => {
                                    const item = tours && tours.find(x => x.tour_id === row.lite_tour_id)
                                    const qty = lite && lite.find(x => x.lite_id === row.lite_id)
                                    return (
                                        <tr>
                                            <td class="hidden pb-4 md:table-cell">
                                                <a href="#">
                                                    {
                                                        item.tours_images &&
                                                        <img src={`/api/tours_images/photo/` + item.tours_images[2].toim_filename}
                                                            alt={`${tours.toim_id}`}
                                                            className="block pr-px w-40 h-30 rounded-lg bg-cover"
                                                        />
                                                    }
                                                </a>
                                            </td>
                                            <td>
                                                <a href="#">
                                                    <p class="mb-2 md:ml-4">
                                                        {item && item.tour_name}
                                                    </p>
                                                    <form action="" method="DELETE">
                                                        <button type="submit"
                                                            class="text-red-600 md:ml-4"
                                                            onClick={() => {
                                                                if (window.confirm("Are you sure you wish to delete this item?")
                                                                )
                                                                    onDelete(row.lite_id)
                                                            }}>
                                                            <small>Delete Item</small>
                                                        </button>
                                                    </form>
                                                </a>
                                            </td>

                                            <td class="justify-center md:justify-end md:flex mt-6">
                                                <div class="w-20 h-10">
                                                    <div class="relative flex flex-row w-full h-8">
                                                        {qty && qty.lite_qty}
                                                    </div>
                                                </div>
                                            </td>

                                            <td class="text-right">
                                                <span class="text-sm lg:text-base font-medium">
                                                    {item && item.tour_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                </span>
                                            </td>
                                            <hr></hr>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table> */}

                        {orders && orders.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <div class="pb-6 mt-6">
                                        <div class="my-4 mt-6 -mx-2 lg:flex">
                                            <div class="lg:px-2 lg:w-1/2">
                                                <div class="p-2 bg-gray-100 rounded-full">
                                                    <h1 class="ml-2 font-bold uppercase">Metode Pembayaran</h1>
                                                </div>
                                                <div class="p-2">
                                                    <p class="mb-4 italic">If you have a coupon code, please enter it in the box below</p>
                                                </div>

                                                <div class="p-2 mt-6 bg-gray-100 rounded-full">
                                                    <h1 class="ml-2 font-bold uppercase">Order City</h1>
                                                </div>
                                                <div class="p-2">
                                                    <p class="mb-4 italic">{row.order_city}</p>
                                                </div>

                                                <div class="p-2 bg-gray-100 rounded-full">
                                                    <h1 class="ml-2 font-bold uppercase">Order Address</h1>
                                                </div>
                                                <div class="p-2">
                                                    <p class="mb-4 italic">{row.order_address}</p>
                                                </div>
                                            </div>
                                            <div class="lg:px-2 lg:w-1/2">
                                                <div class="p-2 bg-gray-100 rounded-full">
                                                    <h1 class="ml-2 font-bold uppercase">Order Details</h1>
                                                </div>
                                                <div class="p-4">
                                                    <p class="mb-6 italic">Shipping and additionnal costs are calculated based on values you have entered</p>
                                                    <div class="flex justify-between border-b">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                                            Order Price
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                                            Rp {row.order_total_children.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between border-b">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                                            Order Discount
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                                            Rp {row.order_discount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between border-b">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                                            Order Tax
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                                           Rp {row.order_tax.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')} 
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between border-b">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                                            Order Total Quantity
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                                           {row.order_total_qty}
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between border-b">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                                            Payment Number
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                                           {row.order_payt_trx_number}
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between border-b">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                                                            Order Total 
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                                                           Rp {row.order_total_due.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                        </div>
                                                    </div>
                                                   
                                                    
                                                    <a href="#">
                                                        <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                                                        >
                                                            <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                                                            <span class="ml-2 mt-5px">Bayar Sekarang</span>
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </tr>
                            )
                        })}

                    </div>
                </div>
            </div>

            <Footer />

        </>
    );
}