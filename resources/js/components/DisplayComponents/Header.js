import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { checkUserIsAdmin } from "../../redux/actions/isAdminActions"
import { logout } from "../../redux/actions/authenticationActions";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

const Header = ({ userIsAuthenticated, isAdmin, checkUserIsAdmin, logout }) => {
    const [mobileIsOpen, setMobileIsOpen] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setMobileIsOpen(false);
    }, [location]);

    function toggleMobileNavigation() {
        setMobileIsOpen(!mobileIsOpen);
    }

    function handleLogout() {
        confirmAlert({
            title: "Confirm logout",
            message: `Are you sure you want to logout?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        logout();
                        toast.info("Logged out.");
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    return (
        <nav className="flex items-center justify-between flex-wrap p-4 shadow-md">
            <div className="flex items-center flex-shrink-0  mr-6">
                <Link to="/">
                    <h1 className="text-grey-800 text-xl">Mentior Corp Finance Tool</h1>
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
                    {userIsAuthenticated && (
                        <>
                            <Link
                                to="/"
                                className="block mt-4 md:inline-block md:mt-0 text-grey-800 hover:text-grey-400 md:mx-4"
                            >
                                Dashboard
                            </Link>
                        </>
                    )}
                </div>
                <div className="border-t mt-2 md:border-0 md:mt-0">
                    {!userIsAuthenticated && (
                        <>
                            <Link
                                to="/login"
                                className="text-sm md:px-4 md:py-2 md:leading-none md:border rounded text-grey-800 md:border-grey-800  md:hover:bg-grey-800 mt-4 md:mt-0 inline-flex items-center md:mr-2"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span className="ml-1">Login</span>
                            </Link>
                            <Link
                                to="/register"
                                className="text-sm md:px-4 md:py-2 md:leading-none md:border rounded text-gey-800 md:border-grey-800  md:hover:bg-grey-800 mt-4 md:mt-0 inline-flex items-center"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="ml-1">Register</span>
                            </Link>
                        </>
                    )}
                    {userIsAuthenticated && (
                        <>
                            <Link
                                to="/profile"
                                className="text-sm md:px-4 md:py-2 md:leading-none md:border rounded text-grey-800 md:border-grey-800  md:hover:bg-grey-800 mt-4 md:mt-0 inline-flex items-center"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="ml-1">Profile</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm md:px-4 md:py-2 md:leading-none md:border rounded text-grey-800 md:border-grey-800  md:hover:bg-grey-800 mt-4 md:mt-0 md:ml-2 inline-flex items-center"
                            >
                                <svg className="text-grey-800 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

Header.propTypes = {
    userIsAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    checkUserIsAdmin: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        userIsAuthenticated: state.tokens != null,
        isAdmin: state.isAdmin
    };
};

const mapDispatchToProps = {
    checkUserIsAdmin,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
