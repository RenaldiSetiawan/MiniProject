import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import auth from '../../views/users/AuthHelper'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../action/userAction'

export default function Register(props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [values, setValues] = useState({
        user_name: undefined,
        user_email: undefined,
        user_password: undefined,
        user_birthdate: undefined,
        user_gender: undefined,
        user_type: "user"
    });

    const handleOnChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const userRegisterReducer = useSelector((state) => state.userRegisterReducer)
    const { userRegis } = userRegisterReducer

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register(values));
    }

    useEffect(() => {
        if (userRegis) {
            const redirect = location.search
                ? new URLSearchParams(location.search).get("redirect")
                : "/tourtravel/login";
            history.push(redirect);
        }
    }, [userRegis, history])

    return (
        <>
            <div className=" bg-fixed bg-grey-lighter min-h-screen flex flex-col bg-cover">
                <div class="w-full h-screen relative">
                    <div class="absolute w-full h-full z-10 ">
                        <div className="pt-6 container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full opacity-75">
                                <h1 className="mb-8 text-3xl text-center font-serif">
                                    Sign up
                                </h1>
                                {values.error && (
                                    <p className="text-red-600 text-lg italic">
                                        {values.error}
                                    </p>
                                )}
                                {/* Code Here */}
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    placeholder="Full Name"
                                    onChange={handleOnChange('user_name')}
                                />
                                {/* ------------------------------------------------------------------------ */}
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleOnChange('user_email')}
                                />
                                {/* ------------------------------------------------------------------------ */}
                                <input
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleOnChange('user_password')}
                                />
                                {/* ------------------------------------------------------------------------ */}
                                <label
                                    className="block text-sm font-medium text-gray-700">
                                    Birth date
                                </label>
                                <input
                                    type="Date"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="birthdate"
                                    placeholder="Birth Date"
                                    onChange={handleOnChange('user_birthdate')}
                                />
                                {/* ------------------------------------------------------------------------ */}
                                <label
                                    htmlFor="first_name"
                                    className="block text-sm font-medium text-gray-700">
                                    Gender
                                </label>
                                <select
                                    type="select"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="gender"
                                    onChange={handleOnChange('user_gender')}
                                >
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                                {/* ------------------------------------------------------------------------ */}
                                <select
                                    type="select"
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    name="type"
                                    onChange={handleOnChange('user_type')}
                                >
                                    <option value="Female">user</option>
                                </select>

                                <button
                                    onClick={onSubmit}
                                    type="submit"
                                    className="font-serif inline-block px-6 py-2 font-medium leading-7 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none  w-full p-3">
                                    Create Account
                                </button>
                                <div className="text-center text-sm text-grey-dark mt-4 font-serif">
                                    By signing up, you agree to the
                                    <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                        Terms of Service
                                    </a> and
                                    <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                        Privacy Policy
                                    </a>
                                </div>
                            </div>

                            <div className="text-white mt-6 mb-6 font-serif text-2xl">
                                Already have an account?
                                <Link to="/tourtravel/login" className="pl-3 text-yellow-500">
                                    Sign in
                                </Link>.
                            </div>
                        </div>
                    </div>
                    <div class="absolute w-full h-64 bottom-0 bg-gradient-to-t from-black">

                    </div>
                    <video class="w-full h-64 lg:h-screen object-cover" loop autoPlay muted >
                        <source class="h-screen object-contain"
                            src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4"
                            type="video/mp4" />
                    </video>
                </div>
            </div>
        </>
    );
}
