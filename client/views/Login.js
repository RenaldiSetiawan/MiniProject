import React, { useState, useEffect } from 'react'
import { Link, Redirect, useHistory } from "react-router-dom";
import { signin } from '../views/users/ApiUsers'
import auth from '../views/users/AuthHelper'

export default function Login(props) {

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

        signin(users).then((data) => {
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
                history.push("/tr/tours");
            } else {
                history.push("/tr/landing");
            }
        }
    }, [tours]);

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
                            <Link to="/tr/register">
                            <button className="bg-transparent text-gray-900  p-2 rounded border border-white mr-4 hover:bg-gray-100 hover:text-gray-900">
                                
                                    Sign up for free
                                
                            </button>
                            </Link>
                        </div>
                    </nav>

                    <div className="body mt-20 mx-8">
                        <div className="md:flex items-center justify-between">
                            <div className="w-full md:w-1/2 mr-auto" >
                                <h1 className="text-4xl font-bold text-white tracking-wide">Tour Travel</h1>
                                <h2 className=" text-2xl font-bold text-white tracking-wide">Welcome <span className="text-gray-800"> Back</span></h2>
                                <p className="text-gray-300">
                                    Gateway to great destination.
                                </p>
                                <span className="text-white">Create New Account?
                                    <a href="#" className="text-gray-900 text-lg ml-2 font-bold">
                                        <Link to="/tr/register">
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
                                            onChange={handleOnChange('email')}
                                            required
                                            className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
                                            placeholder="Email Address"
                                        />
                                        <input
                                            type="password"
                                            autoComplete="current-password"
                                            onChange={handleOnChange('password')}
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
