import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { logout } from "../../redux/actions/authenticationActions";
import { confirm } from "../../tools/PopupHelper";

const Header = () => {
    const dispatch = useDispatch();
    const userIsAuthenticated = useSelector((state) => state.tokens != null);
    const [mobileIsOpen, setMobileIsOpen] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setMobileIsOpen(false);
    }, [location]);
    function toggleMobileNavigation() {
        setMobileIsOpen(!mobileIsOpen);
    }

    function confirmLogout() {
        confirm(
            "Confirm logout",
            `Are you sure you want to logout?`,
            handleLogout
        );
    }

    function handleLogout(){
        dispatch(logout());
    }

    return (
        <nav className="flex items-center justify-between flex-wrap p-4 shadow-md">
            <div className="flex items-center flex-shrink-0  mr-6">
                <Link to="/">
                    <h1 className="logo-text font-bold text-2xl">Mentior Corp Finance Tool</h1>
                </Link>
            </div>
            <div className="block md:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-white hover:border-white pointer" onClick={toggleMobileNavigation}>
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div className={`${mobileIsOpen ? "block" : "hidden"} w-full flex-grow md:flex md:items-center md:w-auto`}>
                <div className="text-sm md:flex-grow">
                </div>
                <div className="border-t mt-2 md:border-0 md:mt-0">
                    {userIsAuthenticated && (
                        <>
                            <Link
                                to="/"
                                className="bg-primary text-sm md:px-4 md:py-2 md:leading-none md:border rounded text-white mt-4 md:mt-0 inline-flex items-center hover:opacity-75"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                <span className="ml-1">Dashboard</span>
                            </Link>
                            <Link
                                to="/auth/changePassword"
                                className="bg-primary text-sm md:px-4 md:py-2 md:leading-none md:border rounded text-white mt-4 md:mt-0 md:ml-2 inline-flex items-center hover:opacity-75"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="ml-1">Change password</span>
                            </Link>
                            <button
                                onClick={confirmLogout}
                                className="bg-primary text-sm md:px-4 md:py-2 md:leading-none md:border rounded text-white  mt-4 md:mt-0 md:ml-2 inline-flex items-center hover:opacity-75"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="ml-1">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
