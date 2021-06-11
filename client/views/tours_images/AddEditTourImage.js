import React, { useState, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import { useHistory } from "react-router-dom";

import ApiToursImages from './ApiTours_Images'
import { Redirect, Link } from 'react-router-dom'


export default function AddEditTourImage({ match }) {
    let history = useHistory();

    const [blob, setBlob] = useState([]);
    const [files, setFiles] = useState([]);
    const [edit, setEdit] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const [values, setValues] = useState({
        image: undefined,
        toim_primary: undefined,
        toim_tour_id: undefined,
        error: "",
        redirect: false
    });

    const uploadSingleFile = name => event => {
        setUploaded(true)

        const x = event.target.files[0];
        setBlob({ ...blob, [name]: URL.createObjectURL(event.target.files[0]) })
        console.log(blob)

        setFiles({ ...files, ['image']: event.target.files[0] })
        console.log(files);
    }

    useEffect(() => {
        ApiToursImages.findOne(match.params.tourimageId).then(data => {
            if (data.error) {
                console.log(data.error) 
                setEdit(false)
            } else {
                setValues({
                    ...values, 
                    toim_id: data.toim_id,
                    toim_filename: data.toim_filename,
                    toim_filepath: data.toim_filepath,
                    toim_primary: data.toim_primary.boolena,
                    toim_tour_id: data.toim_tour_id
                });

                // console.log("profile emp : " + data.profile + " " + data.toim_id);

                ApiToursImages.showImage(`/api/tours_images/` + data.toim_filename, data.toim_filename).then(result => {
                    if (result.error) {
                        console.log('Get Image Failed')
                    } else {
                        const x = result;
                        setFiles({ ...files, image: x })
                        setBlob({ ...blob, image: URL.createObjectURL(result) })
                    }

                })
            }
        });

        setUploaded(false)
        setEdit(true)

    }, [match.params.tourimageId])

    const handleOnChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const imageUrl =
        `/api/tours_images/${values.toim_filename}`

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(edit);
        let tourimages = new FormData()
        tourimages.append('toim_id', parseInt(values.toim_id));
        tourimages.append('image', values.image);
        tourimages.append('toim_primary', values.toim_primary);
        tourimages.append('toim_tour_id', values.toim_tour_id);


        if (!edit) {
            ApiToursImages.create(tourimages).then(data => {
                if (data.errors) {
                    console.log('create new record failed')
                    setValues({ ...values, error: data.errors[0].message })
                } else {
                    setValues({ ...values, redirect: true })
                }
            })
        } else {
            ApiToursImages.update(tourimages).then(data => {
                if (data.errors) {
                    console.log('create new record failed')
                    setValues({ ...values, error: data.errors[0].message })
                } else {
                    setValues({ ...values, redirect: true })
                }
            })
        }
    }

    if (values.redirect) {
        return (<Redirect to={'/tr/toursimages'} />)
    }

    return (
        <>
            <PageHeader title={'TourImages'} setModal={() => history.goBack()} actionType={'Back'} />
            <div class="mt-10 sm:mt-0">
                <div class="md:grid md:grid-cols-3 md:gap-6  items-center">

                    <div class="mt-5 md:mt-0 md:col-span-2">
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
                                                    name="Boolean"
                                                    type="select"
                                                    onChange={handleOnChange('toim_primary')}                     
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                >
                                                 <option value="Garuda">true</option>
                                                 <option value="Garuda">false</option>
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
                                                {/* ------------------------------------------------- */}
                                        </div>

                                        <div className="col-span-6 sm:col-span-2 lg:col-span-3 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-2 text-center">

                                                <div className="mx-auto h-48 w-24 text-gray-400">
                                                    <img src={blob.image} alt='image' className="mx-auto h-48 w-48" />
                                                </div>

                                                <div className="flex text-sm text-gray-600">
                                                    <label for="image" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                        <span>
                                                            Upload a file
                                                        </span>
                                                        <input 
                                                            id="image" 
                                                            accept="image/*" 
                                                            name="image"
                                                            value={values.image} 
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
                                    <Link to="/tr/tours_img" >
                                        <button type="submit"
                                            class="inline-flex mr-3 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Cancel
                                        </button>
                                    </Link>

                                    <button type="submit"
                                        onClick={onSubmit}
                                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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