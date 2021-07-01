import React from "react";
import { Link } from "react-router-dom";
import YearsList from "./YearsList";

const YearsDashboard = () => {
    return (
        <div className="years-page">
            <div className="my-4">
                <Link to={`/headOffice/years/add`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded pointer mr-2">Add Reporting Year</Link>
            </div>

            <div>
                <YearsList />
            </div>
        </div>
    );
};

export default YearsDashboard;
