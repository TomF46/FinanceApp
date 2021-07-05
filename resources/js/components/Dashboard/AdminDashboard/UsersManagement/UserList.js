import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUsers, getUsersWithPaginator } from "../../../../api/usersApi"
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage"
import UsersListWithPagination from "../../../DisplayComponents/UsersListWithPagination";
import { Link } from "react-router-dom";

const UserList = () => {
    const [usersPaginator, setUsersPaginator] = useState(null);
    useEffect(() => {
        if (!usersPaginator) {
            getUsers().then(usersData => {
                setUsersPaginator(usersData);
            }).catch(error => {
                toast.error("Error getting users " + error.message, {
                    autoClose: false,
                });
            });
        }
    }, [usersPaginator])

    function getUsersPage(url) {
        getUsersWithPaginator(url).then(usersData => {
            setUsersPaginator(usersData);
        }).catch(error => {
            toast.error("Error getting users " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <div className="users-admin-page">
            <div className="col-span-12">
                {!usersPaginator ? (
                    <LoadingMessage message={'Loading users'} />
                ) : (
                    <>
                        <div className="my-8">
                            <div className="my-2 card shadow-md rounded-md">
                                <div className="bg-primary rounded-t-md">
                                    <p className="text-white font-bold text-lg px-2 py-1">Users</p>
                                </div>
                                <div>
                                    {usersPaginator.total > 0 ? (
                                        <UsersListWithPagination paginationData={usersPaginator} onPageChange={getUsersPage} />
                                    ) : (
                                        <p className="text-center">There are currently no users added.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

UserList.propTypes = {
};

export default UserList;
