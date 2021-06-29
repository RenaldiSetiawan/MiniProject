import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import { useHistory, useLocation } from "react-router-dom";
import { Redirect, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { createTourImage } from '../action/tour_imagesAction';

export default function AddEditTourImage() {


    const [blob, setBlob] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [values, setValues] = useState({
        image: undefined,
        toim_primary: undefined,
        toim_tour_id: undefined
    });

    const toimCreate = useSelector((state) => state.toimCreate)
    const { toimRegis } = toimCreate

    const handleOnChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const uploadSingleFile = name => event => {
        setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0]) })
        setValues({ ...values, ['image']: event.target.files[0] })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        dispatch(createTourImage(values));
        window.location = '/tourtravel/toursimages/'
        props.setModal();
    }

    return (
        <>
            <PageHeader title={'TourImages'} setModal={() => history.goBack()} actionType={'Back'} />
            <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-3 md:gap-6  items-center">
                    <div class="mt-5 md:mt-0 md:col-span-2">
                        {/* CODE HERE */}
                        <form action="#" method="POST">
                            <div class="shadow overflow-hidden sm:rounded-md">
                                <div class="px-4 py-5 bg-white sm:p-6">
                                    <div class="grid grid-cols-6 gap-6">
                                        <div class="col-span-6 sm:col-span-3">

                                            <label
                                                htmlFor="first_name"
                                                className="block text-sm font-medium text-gray-700">
                                                Primary
                                            </label>
                                            <select
                                                id="toim_primary"
                                                name="toim_primary"
                                                type="select"
                                                onChange={handleOnChange('toim_primary')}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            >
                                                <option>true</option>
                                                <option>false</option>
                                            </select>
                                            <div className="pt-3 ..."></div>
                                            {/* ------------------------------------------------- */}
                                            <label
                                                htmlFor="first_name"
                                                className="block text-sm font-medium text-gray-700">
                                                ToIm Tour Id
                                            </label>
                                            <input
                                                id="toim_tour_id"
                                                name="toim_tour_id"
                                                type="text"
                                                onChange={handleOnChange('toim_tour_id')}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            <div className="pt-3 ..."></div>
                                        </div>
                                        {/* ------------------------------------------------- */}
                                        <div className="col-span-6 sm:col-span-2 lg:col-span-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-2 text-center">
                                                <div className="flex text-sm text-gray-600">
                                                    <label for="image" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                        <img src={blob.image} />
                                                        <span>
                                                            Upload a file
                                                            <svg xmlns="http://www.w3.org/2000/svg" height="50pt" viewBox="0 -18 512 512" width="60pt">
                                                                <path d="m432 0h-352c-44.113281 0-80 35.886719-80 80v280c0 44.113281 35.886719 80 80 80h273c11.046875 0 20-8.953125 20-20s-8.953125-20-20-20h-73.664062l-45.984376-59.65625 145.722657-185.347656 98.097656 108.421875c5.546875 6.136719 14.300781 8.21875 22.019531 5.246093 7.714844-2.976562 12.808594-10.394531 12.808594-18.664062v-170c0-44.113281-35.886719-80-80-80zm40 198.085938-79.167969-87.503907c-3.953125-4.371093-9.640625-6.785156-15.523437-6.570312-5.886719.207031-11.386719 2.996093-15.03125 7.628906l-154.117188 196.023437-52.320312-67.875c-3.785156-4.910156-9.636719-7.789062-15.839844-7.789062-.003906 0-.007812 0-.011719 0-6.203125.003906-12.058593 2.886719-15.839843 7.804688l-44.015626 57.21875c-6.734374 8.757812-5.097656 21.3125 3.65625 28.046874 8.757813 6.738282 21.3125 5.097657 28.050782-3.65625l28.175781-36.632812 88.816406 115.21875h-148.832031c-22.054688 0-40-17.945312-40-40v-280c0-22.054688 17.945312-40 40-40h352c22.054688 0 40 17.945312 40 40zm0 0"/><path d="m140 72c-33.085938 0-60 26.914062-60 60s26.914062 60 60 60 60-26.914062 60-60-26.914062-60-60-60zm0 80c-11.027344 0-20-8.972656-20-20s8.972656-20 20-20 20 8.972656 20 20-8.972656 20-20 20zm0 0"/><path d="m468.476562 302.941406c-.058593-.058594-.117187-.121094-.175781-.179687-9.453125-9.519531-22.027343-14.761719-35.410156-14.761719-13.34375 0-25.882813 5.210938-35.324219 14.675781l-38.613281 38.085938c-7.863281 7.753906-7.949219 20.417969-.191406 28.28125 7.753906 7.863281 20.417969 7.953125 28.28125.195312l25.847656-25.492187v112.253906c0 11.046875 8.953125 20 20 20s20-8.953125 20-20v-111.644531l24.738281 25.554687c3.921875 4.054688 9.144532 6.089844 14.371094 6.089844 5.011719 0 10.027344-1.871094 13.910156-5.628906 7.9375-7.683594 8.140625-20.34375.457032-28.28125zm0 0"/>
                                                            </svg>
                                                        </span>
                                                        <input
                                                            id="image"
                                                            accept="image/*"
                                                            name="image"
                                                            onChange={uploadSingleFile('image')}
                                                            type="file"
                                                            className="sr-only"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link to="/tourtravel/toursimages" >
                                        <button type="submit"
                                            class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Cancel
                                        </button>
                                    </Link>
                                    <button type="submit"
                                        onClick={onSubmit}
                                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}