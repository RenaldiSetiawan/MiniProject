import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import NavigationBar from '../components/layout/NavigationBar';
import Footer from '../components/layout/Footer';
import ApiOrders from './orders/ApiOrders'
import ApiTours from './tours/ApiTours';
import ApiLineItems from './lineitems/ApiLineItems';
import ButtonBayar from '../components/ButtonBayar';

export default function BayarOrder() {

    const [bayar, setBayar] = useState("");
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [orders, setOrders] = useState([])
    const [lite, setLite] = useState([])
    const [tours, setTours] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        ApiOrders.list().then(data => {
            setOrders(data)
        })
        ApiTours.list().then(data => {
            setTours(data)
        })
        ApiLineItems.list().then(data => {
            setLite(data)
        })
    }, [])

    if (orders) (
        console.log(orders)
    )

    if (bayar) {
        const data = {
            user_id: parseInt(userInfo.users.user_id),
            order_payt_trx_number: bayar.payt_trx_number
        }
        console.log(data);
        
        history.push('/tourtravel/landing')
        window.location.reload('/tourtravel/landing')
    }

    return (
        <>
            <NavigationBar />

            <div class="flex justify-center">

                <div class="flex flex-col w-full p-8 px-20 text-gray-800 bg-gray-300">
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

                    <div class="flex-1">
                        {orders && orders.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <div class="pb-6 mt-6">
                                        <div class="my-4 mt-6 -mx-2 lg:flex">
                                            <div class="lg:px-2 lg:w-1/2">
                                                <div class="p-2 bg-white rounded-full">
                                                    <h1 class="ml-2 font-bold uppercase text-black font-serif">User Order Information</h1>
                                                </div>
                                                <div class="p-2">
                                                    <img class="w-28 h-28 p-1 bg-white rounded-full" src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb" alt="" />
                                                    <h1 class="mb-4 italic text-lg font-semibold font-serif flex text-black"> Name:
                                                        <h2 className="pl-2 font-semibold font-mono underline">{userInfo.users.user_name}</h2>
                                                    </h1>
                                                    <h1 class="mb-4 italic text-lg font-semibold font-serif flex text-black"> Data Order:
                                                        <h2 className="pl-2 font-semibold font-mono underline">{row.order_name}</h2>
                                                    </h1>
                                                    <h1 class="mb-4 italic text-lg font-semibold font-serif flex text-black"> Created Order:
                                                        <h2 className="pl-2 font-semibold font-mono underline">{row.order_created_on}</h2>
                                                    </h1>
                                                </div>

                                                <div class="p-2 mt-2 bg-white rounded-full">
                                                    <h1 class="ml-2 font-bold uppercase font-serif text-black">Order City</h1>
                                                </div>
                                                <div class="p-1 pl-2">
                                                    <p class="mb-4 italic text-lg font-semibold text-black font-mono underline">{row.order_city}</p>
                                                </div>

                                                <div class="p-2 bg-white rounded-full">
                                                    <h1 class="ml-2 font-bold uppercase  font-serif text-black">Order Address</h1>
                                                </div>
                                                <div class="p-1 pl-2">
                                                    <p class="mb-4 italic text-lg font-semibold text-black font-mono underline">{row.order_address}</p>
                                                </div>
                                            </div>

                                            <div class="lg:px-2 lg:w-1/2">
                                                <div class="p-2 bg-white rounded-full">
                                                    <h1 class="ml-2 font-bold uppercase text-black font-serif text-center">Order Total</h1>
                                                </div>
                                                <div class="p-8 pt-1">
                                                    <div class="flex justify-between border-b-2 border-white pt-0">
                                                        <div class="lg:px-4 lg:py-2 pt-0 m-2 text-lg lg:text-xl font-bold text-center font-serif text-black">
                                                            Order Price
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-black font-mono">
                                                            Rp {row.order_total_children.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between border-b-2 border-white">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-black font-serif">
                                                            Order Discount
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-black font-mono">
                                                            Rp {row.order_discount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between border-b-2 border-white">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-black font-serif">
                                                            Order Tax
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-black font-mono">
                                                            Rp {row.order_tax.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between border-b-2 border-white">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-black font-serif">
                                                            Order Total Quantity
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-black font-mono">
                                                            {row.order_total_qty}
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between pb-2">
                                                        <div class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-black font-serif">
                                                            Order Total
                                                        </div>
                                                        <div class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-black font-mono">
                                                            Rp {row.order_total_due.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
                                                        </div>
                                                    </div>
                                                    <div class="p-2 bg-white rounded-full text-center">
                                                        <h1 class="ml-2 font-bold uppercase text-black font-serif">Petunjuk Pembayaran</h1>
                                                    </div>
                                                    <ol class="list-decimal ml-6 serif text-black flex-row">
                                                        <h1> Check the information shown on the screen. Make sure the total bill is correct and your username is
                                                            <h2 className="underline text-black font-mono font-semibold">{userInfo.users.user_name}</h2>
                                                            <h1>If correct select B Bayar.</h1>
                                                        </h1>
                                                    </ol>
                                                    <div class="pt-2">
                                                        <ButtonBayar amount={row.order_total_due} orderNumber={row.order_name} onSuccess={setBayar} />
                                                    </div>
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