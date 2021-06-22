import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UsersList = ({ users }) => {
    return (
        <div>
            {users.map((user) => {
                return (
                    <div key={user.id} className="grid grid-cols-12 px-2 py-1 border-b border-gray-200 overflow-hidden">
                        <div className="col-span-6 lg:col-span-4">
                            <p className="text-sm text-gray-600">Name:</p>
                            <p className="font-medium text-lg items-center pointer">{user.fullName}</p>
                        </div>
                        <div className="lg:block col-span-4">
                            <p className="text-sm text-gray-600">Role:</p>
                            <p>{user.roleTitle}</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">TBC:</p>
                            <p>TBC</p>
                        </div>
                        <div className="lg:block col-span-2">
                            <p className="text-sm text-gray-600">TBC:</p>
                            <p>TBC</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
};

export default UsersList;
