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
            <div className="col-span-12 overflow-hidden shadow page">
                {!usersPaginator ? (
                    <LoadingMessage message={'Loading users'} />
                ) : (
                    <>
                        <h1 className="font-bold text-4xl my-4 text-center">Users</h1>
                        {usersPaginator.total > 0 ? (
                            <UsersListWithPagination paginationData={usersPaginator} onPageChange={getUsersPage} />
                        ) : (
                            <p className="text-center">There are currently no users added.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

UserList.propTypes = {
};

export default UserList;
