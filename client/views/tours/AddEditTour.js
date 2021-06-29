import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentAddIcon } from '@heroicons/react/solid'
import apiTours from './ApiTours'

export default function AddEditTour(props) {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef();

    const [values, setValues] = useState({
        tour_id: '',
        tour_name: '',
        tour_route: '',
        tour_package: '',
        tour_schedule: '',
        tour_price: '',
        tour_hotel: '',
        tour_pesawat: '',
        tour_description: '',
        tour_user_id: ''
    });

    // gunakan useEffect untuk edit region
    useEffect(() => {
        if (props.tour.actionType === 'Edit') {
            //call apiRegion.findOne untuk mencari region dengan region_id yg dikirim dari props
            apiTours.findOne(props.tour.tour_id).then(data => {
                // jika ketemu, ubah values nya, pastikan tambahkan value={values.region_name}
                // di input type region_name agar bisa show value nya
                setValues({
                    ...values,
                    tour_id: data.tour_id,
                    tour_name: data.tour_name,
                    tour_route: data.tour_route,
                    tour_package: data.tour_package,
                    tour_schedule: data.tour_schedule,
                    tour_price: data.tour_price,
                    tour_hotel: data.tour_hotel,
                    tour_pesawat: data.tour_pesawat,
                    tour_description: data.tour_description,
                    tour_user_id: data.tour_user_id
                })
            })
        } else {
            setValues({
                ...values,
                tour_id: undefined,
                tour_name: "",
                tour_route: "",
                tour_package: "",
                tour_schedule: Date,
                tour_price: Number,
                tour_hotel: "",
                tour_pesawat: "",
                tour_description: "",
                tour_user_id: Number,
            })
        }
    }, [props.tour.actionType])

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = () => {
        const tour = {
            tour_id: undefined,
            tour_name: values.tour_name,
            tour_route: values.tour_route,
            tour_package: values.tour_package,
            tour_schedule: values.tour_schedule,
            tour_price: values.tour_price,
            tour_hotel: values.tour_hotel,
            tour_pesawat: values.tour_pesawat,
            tour_description: values.tour_description,
            tour_user_id: values.tour_user_id
        }

        if (props.tour.actionType === 'Add') {

            const tour = {
                tour_id: values.tour_id || undefined,
                tour_name: values.tour_name || undefined,
                tour_route: values.tour_route || undefined,
                tour_package: values.tour_package || undefined,
                tour_schedule: values.tour_schedule || undefined,
                tour_price: values.tour_price || undefined,
                tour_hotel: values.tour_hotel || undefined,
                tour_pesawat: values.tour_pesawat || undefined,
                tour_description: values.tour_description || undefined,
                tour_user_id: values.tour_user_id || undefined
            }
            //call api u/ insert row
            apiTours.create(tour).then(result => {
                console.log(result);
            })

        } else if (props.tour.actionType === 'Edit') {
            apiTours.update(values).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, error: '', open: true });

                }

            })
        }

        props.setModal();
        props.setStatus();
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <DocumentAddIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            {props.title}
                                        </Dialog.Title>
                                        <div className="mt-2">

                                            {/** code here... */}
                                            <form method="POST" action="#">
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Tour Name
                                                </label>
                                                <input
                                                    id="tour_name"
                                                    name="tour_name"
                                                    type="text"
                                                    value={values.tour_name}
                                                    placeholder="Tour Name"
                                                    onChange={handleChange('tour_name')}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <div className="pt-3 ..."></div>
                                                {/* ------------------------------------------------- */}
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Tour Route
                                                </label>
                                                <input
                                                    id="tour_route"
                                                    name="tour_route"
                                                    type="text"
                                                    value={values.tour_route}
                                                    placeholder="Tour Route"
                                                    onChange={handleChange('tour_route')}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <div className="pt-3 ..."></div>
                                                {/* ------------------------------------------------- */}
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Tour Package
                                                </label>
                                                <input
                                                    id="tour_package"
                                                    name="tour_package"
                                                    type="text"
                                                    value={values.tour_package}
                                                    placeholder="Tour Package"
                                                    onChange={handleChange('tour_package')}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <div className="pt-3 ..."></div>
                                                {/* ------------------------------------------------- */}
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Tour Schedule
                                                </label>
                                                <input
                                                    id="tour_schedule"
                                                    name="tour_schedule"
                                                    type="Date"
                                                    value={values.tour_schedule}
                                                    placeholder="Tour Schedule"
                                                    onChange={handleChange('tour_schedule')}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <div className="pt-3 ..."></div>
                                                {/* ------------------------------------------------- */}                                                {/* ------------------------------------------------- */}
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Tour Price
                                                </label>
                                                <input
                                                    id="tour_price"
                                                    name="tour_price"
                                                    type="number"
                                                    min="1500000"
                                                    value={values.tour_price}
                                                    placeholder="Tour Price"
                                                    onChange={handleChange('tour_price')}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <div className="pt-3 ..."></div>
                                                {/* ------------------------------------------------- */}
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Tour Hotel
                                                </label>
                                                <select id="tour_hotel" name="tour_hotel"
                                                    placeholder="Contoh: Hotel"
                                                    value={values.tour_hotel}
                                                    onChange={handleChange('tour_hotel')}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                >
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </select>
                                                <div className="pt-3 ..."></div>
                                                {/* ------------------------------------------------- */}
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Tour Pesawat
                                                </label>
                                                <select id="tour_pesawat" name="tour_pesawat"
                                                    placeholder="Contoh: Pesawat"
                                                    value={values.tour_pesawat}
                                                    onChange={handleChange('tour_pesawat')}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                >
                                                    <option >Garuda</option>
                                                    <option >Cathay</option>
                                                    <option >Nippon Air</option>
                                                </select>
                                                <div className="pt-3 ..."></div>
                                                {/* ------------------------------------------------- */}
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700">
                                                    Tour Description
                                                </label>
                                                <input
                                                    id="tour_description"
                                                    name="tour_description"
                                                    type="text"
                                                    value={values.tour_description}
                                                    placeholder="Tour Description"
                                                    onChange={handleChange('tour_description')}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                                <div className="pt-3 ..."></div>
                                                {/* ------------------------------------------------- */}
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-900 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onSubmit}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => props.setModal()}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
