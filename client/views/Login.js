import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { login } from '../views/action/userAction'
import { useDispatch, useSelector } from 'react-redux';
import auth from '../views/users/AuthHelper'

export default function Login(props) {


    const location = useLocation();
    const history = useHistory();

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: false
    });

    const dispatch = useDispatch();

    const handleOnChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            const redirect = location.search
                ? new URLSearchParams(location.search).get("redirect")
                : "/tourtravel/landing"
            if (userInfo.users.user_type === "admin") {
                history.push("/tourtravel/tours");
            } else {
                history.push(redirect);
            }
        }
    }, [userInfo, history]);


    const onSubmit = (e) => {
        e.preventDefault();

        if (values.user_email && values.user_password) {
            dispatch(login(values.user_email, values.user_password));
        }
    }

    return (
        <>
            <header className="bg-cover min-h-screen"
                style={{
                    backgroundImage: `url("https://wallpaperaccess.com/full/254381.jpg")`
                }}>
                <div className="content px-8 py-2">
                    <nav className="flex items-center justify-between">
                        <h2 className="text-gray-200 font-bold text-2xl "></h2>
                        <div className="auth flex items-center">
                            <button className="bg-transparent text-gray-900  p-2 rounded border border-white mr-4 hover:bg-gray-100 hover:text-gray-900">
                                Sign in
                            </button>
                            <button className="bg-transparent text-gray-900  p-2 rounded border border-white mr-4 hover:bg-gray-100 hover:text-gray-900">
                                <Link to="/tourtravel/register">
                                    Sign up for free
                                </Link>
                            </button>
                        </div>
                    </nav>

                    <div className="body mt-10 mx-8">
                        <div className="md:flex items-center justify-between">
                            <div className="w-full md:w-1/2 mr-auto" >
                                <h1 className="text-4xl font-bold text-white tracking-wide">
                                    Tour Travel
                                </h1>
                                <h2 className=" text-2xl font-bold text-white tracking-wide">
                                    Welcome
                                    <span className="text-gray-900">
                                        Back
                                    </span>
                                </h2>
                                <p className="text-gray-300">
                                    Gateway to great destination.
                                </p>
                                <span className="text-white">
                                    Create New Account?
                                    <a href="#" className="text-gray-900 text-lg ml-2 font-bold">
                                        <Link to="/tourtravel/register">
                                            Sign Up
                                        </Link>
                                    </a>
                                </span>
                            </div>

                            <div className="w-full md:max-w-md mt-6 opacity-80">
                                <div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
                                    {/* Component Sign */}
                                    {values.error &&
                                        <p class="text-red text-lg italic">{values.error}</p>}
                                    <form className="mt-8 space-y-6" action="#" method="POST">
                                        <input type="hidden" name="remember" defaultValue="true" />
                                        <div className="flex items-center justify-center">
                                            <h2 className="text-2xl font-bold tracking-wide">
                                                Welcome back
                                            </h2>
                                        </div>
                                        <h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
                                            Sign In
                                        </h2>

                                        <input
                                            type="text"
                                            autoComplete="email"
                                            onChange={handleOnChange('user_email')}
                                            required
                                            className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                                            placeholder="Email Address"
                                        />
                                        <input
                                            type="password"
                                            autoComplete="current-password"
                                            onChange={handleOnChange('user_password')}
                                            required
                                            className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                                            placeholder="Password"
                                        />
                                        <div className="flex items-center justify-between">
                                            <a href="#" className="text-gray-600">Forget Password?</a>
                                            <button className="bg-gray-800 text-gray-200  px-2 py-1 rounded"
                                                type="submit"
                                                onClick={onSubmit}>
                                                Sign In
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
