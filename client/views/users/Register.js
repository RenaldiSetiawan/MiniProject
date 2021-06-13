import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from "react-router-dom";
import { signup } from '../users/ApiUsers'
import auth from '../../views/users/AuthHelper'

export default function Register(props) {

    const history = useHistory();

    const [values, setValues] = useState({
        email: undefined,
        password: undefined,
        redirect: false,
        error: ''
    });

    const handleOnChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const users = {
            user_email: values.email || undefined,
            user_password: values.password || undefined
        }

        signup(users).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirect: true })
                    setTour(data);
                })
            }
        })
    }


    const [tours, setTour] = useState("");
    useEffect(() => {
        if (values.redirect) {
            /* console.log('redirect : '||{from}) */
            if (tours.users.user_type === "admin") {
                history.push("/tourtravel/tours");
            } else {
                history.push("/tourtravel/landing");
            }
        }
    }, [tours]);

    return (
        <>
            <div className=" bg-fixed bg-grey-lighter min-h-screen flex flex-col bg-cover style="
                style={{
                    backgroundImage: `url("https://wallpaperaccess.com/full/254381.jpg")`
                }}>
                <div className="pt-6 container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full opacity-75">
                        <h1 className="mb-8 text-3xl text-center">
                            Sign up
                        </h1>
                        {values.error && (
                            <p class="text-red-400 text-lg italic">{values.error}</p>
                        )}
                        {/* Code Here */}
                        <form method="POST" action="#">
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="fullname"
                                placeholder="Full Name"
                                onChange={handleOnChange('user_name')}
                            />
                            {/* ------------------------------------------------------------------------ */}
                            <input
                                type="text"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email"
                                onChange={handleOnChange('user_name')}
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
                                htmlFor="first_name"
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
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700">
                                Select your profile
                        </label>
                            <input
                                type="file"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="avatar"
                                placeholder="Avatar"
                                onChange={handleOnChange('user_avatar')}
                            />
                            {/* ------------------------------------------------------------------------ */}
                            <select
                                type="select"
                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                name="type"
                                onChange={handleOnChange('user_type')}
                            >
                                <option value="Female">user</option>
                            </select>
                        </form>
                        <button
                            onClick={onSubmit}
                            type="submit"
                            className="inline-block px-6 py-2 font-medium leading-7 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none  w-full p-3">
                            Create Account
                        </button>
                        <div className="text-center text-sm text-grey-dark mt-4">
                            By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                        </a>
                        </div>
                    </div>

                    <div className="text-white mt-6 mb-6">
                        Already have an account?
                        <Link to="/tourtravel/login">
                            Sign in
                        </Link>.
                    </div>
                </div>
            </div>
        </>
    );
}
