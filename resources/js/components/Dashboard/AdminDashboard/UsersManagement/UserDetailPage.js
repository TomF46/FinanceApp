import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingMessage from "../../../DisplayComponents/LoadingMessage";
import { deactivateUserById, getUserById } from "../../../../api/usersApi";
import { confirmAlert } from "react-confirm-alert";
import history from "../../../../history";
import UserEditForm from "./UserEditForm";
import UserPasswordChangeForm from "./UserPasswordChangeForm";

const UserDetailPage = ({ userId }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [userId, user])

    function getUser() {
        getUserById(userId).then(userData => {
            setUser(userData);
        }).catch(error => {
            toast.error("Error getting user " + error.message, {
                autoClose: false,
            });
        });
    }

    function handleDeactivate() {
        confirmAlert({
            title: "Confirm deactivation",
            message: `Are you sure you want to deactivate this user?`,
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        deactivate()
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    }

    function deactivate() {
        deactivateUserById(userId).then(response => {
            toast.success("User deactivated");
            history.push("/admin/users");
        }).catch(error => {
            toast.error("Error deactivating user " + error.message, {
                autoClose: false,
            });
        });
    }

    return (
        <>
            {!user ? (
                <LoadingMessage message={"Loading User"} />
            ) : (
                <>
                    <h1 className="text-center font-bold text-4xl">
                        {user.fullName}
                    </h1>

                    <div className="my-4">
                        <UserEditForm user={user} onUserUpdated={getUser} />
                    </div>

                    <div className="my-4">
                        <UserPasswordChangeForm user={user} onUserUpdated={getUser} />
                    </div>

                    {user.role != "0" && (
                        <div className="my-4 card shadow-md rounded-md">
                            <div className="bg-secondary rounded-t-md">
                                <p className="text-white font-bold text-lg px-2 py-1">Actions</p>
                            </div>
                            <div className="px-2 py-2 flex justify-end">
                                <button
                                    onClick={() => (handleDeactivate())}
                                    className="bg-danger text-white rounded py-2 px-4 hover:opacity-75 shadow"
                                >
                                    Deactivate
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
};

UserDetailPage.propTypes = {
    userId: PropTypes.any.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    return {
        userId: ownProps.match.params.userId,
    };
};


export default connect(mapStateToProps)(UserDetailPage);
