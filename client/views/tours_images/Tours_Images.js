import React, { useState, useEffect } from 'react'
import ApiTours_Images from '../../views/tours_images/ApiTours_Images'
import PageHeader from '../../components/PageHeader'
import { useHistory, Link } from "react-router-dom";
import {
    PencilAltIcon,
    TrashIcon,
} from '@heroicons/react/solid'


export default function ToursImages() {
    let history = useHistory();
    const [toursimages, setToursImages] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        // fetch data employees
        ApiTours_Images.list().then(data => {
            setToursImages(data);
        })
    }, []);


    useEffect(() => {
        ApiTours_Images.list().then(data => {
            setToursImages(data);
        })

        setStatus(false)

    }, [status]);


    const onDelete = async (id) => {
        ApiTours_Images.remove(id).then(() => {
            setStatus(true)
        });
    }

    return (
        <>
            <PageHeader title={'Tours Images'} actionType={'Add'} setModal={() => history.push('/tourtravel/toursimages/add')} />
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            File Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            File Size
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            File Type
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Primary
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    { /** let do looping with map here... */
                                        toursimages &&
                                        toursimages.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="mx-auto h-48 w-24 rounded-full"
                                                                    src={`http://localhost:3000/api/tours_images/photo/` + row.toim_filename} alt=""
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {row.toim_filename}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{row.toim_filesize}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{row.toim_filetype}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">{row.toim_primary ? 'true' : 'false'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                                           {/*  <span className="hidden sm:block mr-2">
                                                                <Link to={"/hr/employee/edit/" + row.employee_id}>
                                                                    <button type="button"
                                                                        className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                                    >
                                                                        <PencilAltIcon className="-ml-1 mr-2 h-5 w-5 text-red-600" aria-hidden="true" />
                                                                    </button>
                                                                </Link>
                                                            </span> */}
                                                            <span className="hidden sm:block">
                                                                <button onClick={() => {
                                                                    if (window.confirm('Delete this record ?'))
                                                                        onDelete(row.toim_id)
                                                                }}
                                                                    type="button"
                                                                    className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                                >
                                                                    <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-red-600" aria-hidden="true" />
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
