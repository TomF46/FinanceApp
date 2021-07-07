import React from "react";
import PropTypes from "prop-types";
import TextInput from "../FormComponents/TextInput";
import SelectInput from "../FormComponents/SelectInput";

const UserSearchForm = ({ searchTerms, onSearchTermsChange }) => {
    const roles = [
        { text: "Head Office", value: 1 },
        { text: "Area manager", value: 2 },
        { text: "Retail manager", value: 3 },
        { text: "Unassigned", value: 4 },
    ]

    return (
        <div className="mt-8 mb-4">
            <div className="my-2 card shadow-md rounded-md">
                <div className="bg-gray-500 rounded-t-md">
                    <p className="text-white font-bold text-lg px-2 py-1">Search</p>
                </div>
                <div>
                    <div className="grid grid-cols-12 px-2 py-1">
                        <div className="col-span-12 md:col-span-3 py-2">
                            <TextInput
                                name="firstName"
                                label="First name"
                                value={searchTerms.firstName}
                                onChange={onSearchTermsChange}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3 p-2">
                            <TextInput
                                name="lastName"
                                label="Last name"
                                value={searchTerms.lastName}
                                onChange={onSearchTermsChange}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3 p-2">
                            <SelectInput
                                name="role"
                                label="Role"
                                value={searchTerms.role}
                                options={roles}
                                onChange={onSearchTermsChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserSearchForm.propTypes = {
    searchTerms: PropTypes.object.isRequired,
    onSearchTermsChange: PropTypes.func.isRequired
};

export default UserSearchForm;
