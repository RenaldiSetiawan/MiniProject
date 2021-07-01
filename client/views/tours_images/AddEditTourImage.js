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