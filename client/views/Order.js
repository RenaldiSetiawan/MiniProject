import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import NavigationBar from '../components/layout/NavigationBar';
import Footer from '../components/layout/Footer';
import ApiLineItems from './lineitems/ApiLineItems';
import ApiTours from './tours/ApiTours';
import { orderInput } from './action/shopAction';

export default function Order() {

    const [lite, setLite] = useState([])
    const [tours, setTours] = useState([])

    useEffect(() => {
        ApiTours.list().then(data => {
            setTours(data)
        })

        ApiLineItems.list().then(data => {
            setLite(data)
        })

    }, [])

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [values, setValues] = useState({
        user_id: undefined,
        order_address: undefined,
        order_city: undefined
    });
    const handleOnChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            user_id: parseInt(userInfo.users.user_id),
            order_address: values.order_address,
            order_city: values.order_city
        }

        dispatch(orderInput(data))
        history.push('/tourtravel/bayarorder')
        window.location.reload('/tourtravel/bayarorder')
    }

    return (
        <>
            <NavigationBar />

            {/* <!-- COMPONENT CART--> */}
            <div class="flex justify-center">
                {/* <div><button onClick={onClick}>Check</button></div> */}
                <div class="flex flex-col w-full p-8 text-gray-300 bg-gray-300">
                    <div class="flex-1">
                        {lite && lite.map((row, index) => {
                            const item = tours && tours.find(x => x.tour_id === row.lite_tour_id)
                            const qty = lite && lite.find(x => x.lite_id === row.lite_id)
                            return (
                                <tr>
                                    <div class="grid grid-cols-12 gap-6 ml-48">
                                        <div class="col-span-12 lg:col-span-8 ">
                                            <div class="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4 h- h-20v">
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

                        <div class="pb-6 mt-6 ml-96">
                            <div class="my-4 mt-6 -mx-2 lg:flex">
                                <div class="lg:px-2 lg:w-1/2">
                                    <div class="p-2 mt-6 bg-white rounded-full">
                                        <h1 class="ml-2 font-bold font-serif text-center uppercase text-black">Order City</h1>
                                    </div>
                                    <div class="p-2">
                                        <input
                                            type="text"
                                            name="order_city"
                                            id="order_city"
                                            onChange={handleOnChange('order_city')}
                                            className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-900"
                                            placeholder="Your City" />
                                    </div>

                                    <div class="p-2 bg-white rounded-full">
                                        <h1 class="ml-2 font-bold font-serif text-center uppercase text-black">Order Address</h1>
                                    </div>
                                    <div class="p-2">
                                        <input
                                            type="text"
                                            name="order_address"
                                            id="order_address"
                                            onChange={handleOnChange('order_address')}
                                            className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-900"
                                            placeholder="Your Address" />
                                    </div>
                                    <Link to="/tourtravel/bayarorder">
                                        <button class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full font-serif shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
                                            onClick={onSubmit}
                                            >
                                            <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" class="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                                            <span class="ml-2 mt-5px">Buat Pesanan</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    );
}
