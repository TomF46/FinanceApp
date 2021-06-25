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
                    <h1 className="text-center font-bold text-6xl">
                        {user.fullName}
                    </h1>

                    {user.role != "0" && (
                        <button
                            onClick={() => (handleDeactivate())}
                            className="bg-red-800 text-white rounded py-2 px-4 hover:bg-red-600 shadow"
                        >
                            Deactivate
                        </button>
                    )}

                    <div className="my-4">
                        <UserEditForm user={user} onUserUpdated={getUser} />
                    </div>
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
