import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import NavigationBar from "../components/layout/NavigationBar"
import Footer from "../components/layout/Footer"
import ApiTours from "../views/tours/ApiTours"
import ApiTours_Images from "../views/tours_images/ApiTours_Images"
import { liteInput, komenInput } from "../views/action/shopAction"
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import ApiTours_Comments from '../views/tours_comments/ApiTours_Comments'
import { findOneUser } from './action/userAction';

export default function Detail({ match }) {

    const [tours, setTours] = useState([])
    const [toursimages, setToursImages] = useState([])
    const [tourscomments, setToursComments] = useState([])


    useEffect(() => {
        ApiTours.findOne(match.params.id).then(data => {
            setTours(data)
        })
        ApiTours_Images.findOne(match.params.id).then(data => {
            setToursImages(data)
        })
        ApiTours_Comments.findOne(match.params.id).then(data => {
            setToursComments(data)
        })
    }, [])

    if (tourscomments, tours) {
        console.log(tourscomments, tours);
    }

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userListOne = useSelector(state => state.userListOne)
    const { user } = userListOne
    if (user) {
        useEffect(() => {
            dispatch(findOneUser(userListOne.users.user_id))
        }, [dispatch])
    }

    const [values, setValues] = useState({
        user_id: undefined,
        tour_id: undefined,
        lite_qty: 1,
        toco_id: undefined,
        toco_comments: undefined,
        toco_created_on: new Date()
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            user_id: parseInt(userInfo.users.user_id),
            tour_id: parseInt(tours.tour_id),
            lite_qty: parseInt(values.lite_qty),
        }
        console.log(data);

        dispatch(liteInput(data)).then((result) => {
            console.log(data);
            window.location = "/tourtravel/cart/"
        })
    }

    const onSubmitKomen = (e) => {
        e.preventDefault();
        const data = {
            toco_user_id: parseInt(userInfo.users.user_id),
            toco_tour_id: parseInt(tours.tour_id),
            toco_comments: values.toco_comments,
            toco_rating: values.toco_rating
        }
        console.log(data);

        dispatch(komenInput(data)).then((result) => {
            console.log(data);
            window.location.reload()
        })
    }

    return (
        <>
            <body className="antialiased bg-gray-300" x-data="{ isOpen : false}">
                <NavigationBar />
                {/* <!-- component DETAIL --> */}
                <div className="md:pl-10 pr-6 pt-10 rounded-tl-lg ">
                    <div className="flex flex-wrap no-underline text-black h-64 overflow-hidden">
                        {/* <!-- component images --> */}
                        <div className="md:w-8/12 h-full">
                            {tours.tours_images &&
                                <img src={`/api/tours_images/photo/` + tours.tours_images[0].toim_filename}
                                    alt={`${tours.tour_id}`}
                                    className="block pr-px w-full h-full rounded-l-lg md:bg-cover border-r-2"
                                    style={{ minHeight: "60vh" }}
                                />
                            }
                        </div>
                        {/* <!-- component images --> */}
                        <div className="w-96 h-3/6">
                            {tours.tours_images &&
                                <img src={`/api/tours_images/photo/` + tours.tours_images[1].toim_filename}
                                    alt={`${tours.tour_id}`}
                                    className="block pr-px w-full h-full rounded-tr-lg border-l-2 border-b-2 md:bg-cover"
                                    style={{ minHeight: "39vh" }}
                                />
                            }
                            {/* <!-- component images --> */}
                            <div className="h-30">
                                {tours.tours_images &&
                                    <img src={`/api/tours_images/photo/` + tours.tours_images[2].toim_filename}
                                        alt={`${tours.tour_id}`}
                                        className="block pr-px w-full h-full rounded-br-lg md:bg-cover border-l-2 border-t-2"
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
                        <h1 className="mb-2 leading-tight tracking-tight font-bold font-serif text-gray-900 text-2xl md:text-3xl">
                            Explore your travel at {tours.tour_name}
                        </h1>
                        {/* Bintang Review */}
                        <span className="flex items-center">
                            <svg class="w-6 h-6 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg class="w-6 h-6 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg class="w-6 h-6 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg class="w-6 h-6 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                            <svg class="w-6 h-6 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                        </span>

                        <p className="pt-1 leading-tight tracking-tight font-bold font-serif text-gray-900 text-2xl">
                            Travel Route
                        </p>
                        <h3 className="mb-2 underline leading-tight tracking-tight font-mono text- text-indigo-600  text-2xl md:text-3xl">
                            {tours.tour_route}
                        </h3>
                        <p className="pt-1 leading-tight tracking-tight font-bold font-serif text-gray-900 text-2xl">
                            Airplane Travel
                        </p>
                        <h3 className="mb-2 underline leading-tight tracking-tight font-mono text- text-indigo-600  text-2xl md:text-3xl">
                            {tours.tour_pesawat}
                        </h3>
                        <p className="pt-1 leading-tight tracking-tight font-bold font-serif text-gray-900 text-2xl">
                            Travel Package
                        </p>
                        <h3 className="mb-2 underline leading-tight tracking-tight font-mono text- text-indigo-600  text-2xl md:text-3xl">
                            {tours.tour_package}
                        </h3>
                        <p className="pt-1 leading-tight tracking-tight font-bold font-serif text-gray-900 text-2xl">
                            Travel Itinerary
                        </p>
                        <h3  className="mb-2 underline leading-tight tracking-tight font-mono text- text-indigo-600  text-2xl md:text-3xl">
                        {tours.tour_schedule}
                        </h3>

                        <div className="flex items-center space-x-4 my-4">
                            <div>
                                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                    <span className="text-indigo-400 mr-1 mt-1">Rp</span>
                                    <span className="font-bold text-indigo-600 text-3xl font-mono">
                                    {tours.tour_price && tours.tour_price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}

                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-green-500 text-xl font-semibold">Each Person</p>
                            </div>
                        </div>
                        <h3 className="mb-2 leading-tight tracking-tight font-mono text- text-black  text-2xl md:text-3xl">
                            {tours.tour_description}
                        </h3>

                        <div className="flex py-4 space-x-4">
                            <div className="relative">
                                <label
                                    htmlFor="first_name"
                                    className="font-bold font-serif text-gray-900 text-2xl">
                                    Number of people
                                </label>
                                <input
                                    id="lite_qty"
                                    name="lite_qty"
                                    type="number"
                                    min="1"
                                    max="20"
                                    placeholder="1"
                                    onChange={handleChange('lite_qty')}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                            <button class="text-white px-4 w-30 h-10 bg-gray-900 rounded-full active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                                onClick={onSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
                                </svg>
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                }

                {/* <!-- comment form --> */}
                <div class="flex items-center justify-center shadow-lg mt-2 mx-10 mb-4 ">
                    <form class="w-full bg-white rounded-lg px-4 pt-2">
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <h2 class="px-4 pt-3 pb-2 text-gray-900 text-lg font-serif">Add a new comment</h2>
                            <div class="w-full md:w-full px-3 mb-2 mt-2">
                                <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                    name="body"
                                    placeholder='Type Your Comment &#128591;'
                                    onChange={handleChange('toco_comments')}
                                    required>
                                </textarea>
                                <input
                                    id="toco_rating"
                                    name="toco_rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    placeholder="Please give a rating for this tour &#11088; &#11088; &#11088; &#11088; &#11088;"
                                    onChange={handleChange('toco_rating')}
                                    className="mt-1 bg-gray-100 rounded border border-gray-400 block w- w-96 shadow-sm sm:text-sm"
                                />
                            </div>
                            <div class="w-full flex items-start md:w-full px-3">
                                <div class="flex items-start w-1/2 px-2 mr-auto">
                                    <img class="mr-0.5" src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb" />
                                    <img class="mr-0.5" src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f" />
                                    <img class="mr-0.5" src="https://static-exp1.licdn.com/sc/h/7fx9nkd7mx8avdpqm5hqcbi97" />
                                </div>
                                <button class=" bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                                    onClick={onSubmitKomen} >
                                    Post Comment
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="w-full px-10 pt-2 pb-4">
                    <div className="w-full p-2 mx-auto bg-white rounded-2xl">
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-black font-serif bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                        <span>Other people's reviews</span>
                                        <ChevronUpIcon
                                            className={`${open ? 'transform rotate-180' : ''
                                                } w-5 h-5 text-purple-500`}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                        {tours.tours_comments && tours.tours_comments.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <div class="flex items-start mb-4 border-b-2 border-gray-500">
                                                        <div class="flex-shrink-0">
                                                            <div class="inline-block relative">
                                                                <img class="w-20 h-20 p-1 bg-white rounded-full"
                                                                    src="https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                        <div class="ml-6">
                                                            <p class="flex items-baseline">
                                                                {/* <span class="text-gray-600 font-bold">{userInfo.users.user_name}</span> */}
                                                                <span class="text-gray-600 font-bold">{user && user.user_name}</span>
                                                                <span class="ml-2 text-green-600 text-xs">Verified Buyer</span>
                                                            </p>
                                                            <div class="flex items-center mt-1">
                                                                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                                                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                                                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                                                <svg class="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                                                <svg class="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                                                <p className="pl-2">{row.toco_rating}</p>
                                                            </div>

                                                            <div class="mt-3">
                                                                <p class="mt-1">{row.toco_comments}</p>
                                                            </div>
                                                            <div class="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                                                                <div class="flex items-center">
                                                                    <span>{row.toco_created_on}</span>

                                                                    <button class="flex items-center ml-96">
                                                                        <button class="flex items-center ml-96 pr-4">
                                                                            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z" /></svg>
                                                                            <span class="ml-2">56</span>
                                                                        </button>
                                                                        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z" /></svg>
                                                                        <span class="ml-2">10</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </tr>
                                            )
                                        })}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                </div>
                <Footer />
            </body>
        </>
    );
}
