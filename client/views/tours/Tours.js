import React, { useState, useEffect } from 'react'
import apiTour from './ApiTours'
import PageHeader from '../../components/PageHeader'

import AddEditTour from './AddEditTour'


export default function Tour() {

    const [tours, setTours] = useState([]);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(false);
    // digunakan untuk edit tour, kita butuh tour_id
    const [tour, setTour] = useState({
        tour_id: undefined,
        actionType: undefined
    })

    useEffect(() => {
        // call api
        apiTour.list().then(data => {
            //jika response sukses, then fill data to regions variable using setRegions
            setTours(data)
        }).catch(err => {
            console.log(err)
        });

    }, []); //jika useEffect parameter kedua di isi empty array[], useEffect akan di run 1 kali.

    useEffect(() => {

        apiTour.list().then(data => {
            setTours(data);
            setStatus(false);
        }).catch(err => {
            console.log(err)
        });

    }, [status]); // jika status berubah maka useEffect di trigger kembali

    const onDelete = async (id) => {
        apiTour.remove(id).then(result => {
            console.log(result);
            setStatus(true)
        })
    }

    const onCreate = async () => {
        setTour({
            tour_id: undefined,
            actionType: 'Add'
        })
        setModal(true)
    }

    const onEdit = async (id) => {
        setTour({
            tour_id: id,
            actionType: 'Edit'
        })
        setModal(true)
    }

    return (
        <div>
            <PageHeader title={'Tours'} setModal={() => onCreate()} />
            
            <div className="pt-1 ..."></div> {/*batas spasi */}

            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-4"> {/*ROW TABEL */}
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            
                            <table className="w-10 divide-y divide-gray-200" > 
                                <thead className="bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours Route
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours Package
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours Schedule
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours Price
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours Hotel
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours Pesawat
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours Description
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Tours User Id
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                            
                                <tbody className="bg-white  divide-y">
                                    {tours.map((data) => (
                                        <tr key={data.tour_id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">{data.tour_name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.tour_route}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.tour_package}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.tour_schedule}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.tour_price}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.tour_hotel}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.tour_pesawat}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.tour_description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.tour_user_id}</div>
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <div className="mt-5 flex lg:mt-0 lg:ml-4">

                                                    <span className="hidden sm:block mr-2">
                                                        {/* tombol edit */}
                                                        <button
                                                            onClick={() => {
                                                                onEdit(data.tour_id)
                                                            }}
                                                            type="button"
                                                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="blue">
                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                            </svg>
                                                        </button>
                                                    </span>

                                                    <span className="hidden sm:block">
                                                        {/* TOMBOL DELET/TRASH */}
                                                        <button
                                                            onClick={() => {
                                                                if (
                                                                    window.confirm(
                                                                        "Are you sure you wish to delete this item?"
                                                                    )
                                                                )
                                                                    onDelete(data.tour_id)
                                                            }}
                                                            type="button"
                                                            className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </span>

                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
   
        
            {modal ? <AddEditTour title={'Add Tour'}
                setModal={() => setModal(false)}
                setStatus={() => setStatus(true)} //untuk refres
                tour={tour}
            /> : null}

        </div>
    )
}
