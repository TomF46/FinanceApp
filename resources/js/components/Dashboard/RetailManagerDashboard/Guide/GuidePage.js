import React from "react";
import { Link } from "react-router-dom";


const GuidePage = () => {
    return (
        <div className="guide-page">
            <div className="my-2 card shadow-md rounded-md p-4">
                <h1 className="text-center text-primary font-bold text-4xl">User guide</h1>
                <div className="my-4">
                    <p>Welcome to the 'Metior Corp Finance Tool' retailer user guide a step by step guide for both first time users and retailer returning years later for subsequent applications that need a refresher. If we cant answer all of your queries please contact your local area manager who will be able to help.</p>
                </div>
                <div className="my-4">
                    <h1 className="text-primary font-bold text-2xl">Why we need you to complete this</h1>
                    <p className="mt-2">This tool is to allow us to easily gain information about each of our locations income and expenditure over a certain period and allows us to determine their financial health. Depending on your answers we will compute how much we are going to invest in your location so it is beneficial to be as accurate as possible, this will also be checked by your area managers and any erroneous data will be rejected and you will have to amend your application until they are happy. </p>
                </div>
                <div className="my-4">
                    <h1 className="text-primary font-bold text-2xl">Step 1</h1>
                    <p className="mt-2">First you need to select which application you want to action from the 'My Applications' section of your dashboard incomplete applications will have the status 'Not submitted'. Clicking this will take you to a page where you will be able to begin submitting your locations information.</p>
                </div>
                <div className="my-4">
                    <h1 className="text-primary font-bold text-2xl">Step 2</h1>
                    <p className="mt-2">Next you need to complete your application, fill in each value making sure all the information is correct for your location. You can find helpful tooltips by hovering or clicking on the input labels. Please ensure all section are complete before submitting.</p>
                </div>
                <div className="my-4">
                    <h1 className="text-primary font-bold text-2xl">Step 3</h1>
                    <p className="my-2">Once you have submitted your area manager will now be able to view your submission and either reject (with a reason) or accept your submission, all you need to do is wait. Once the area manager is finished the status on your homepage will change to one of the following.</p>
                    <ul>
                        <li>Rejected - The form you previously completed will be editable with your previous inputs as well as showing a section with the reasons for the rejection so you can fix these issues. Once resubmitted 'Step 3 will be repeated'.</li>
                        <li>Accepted - An overview of your application as well as an overview of the amount you will recieve now your application has been accepted</li>
                    </ul>
                </div>
                <div className="my-4">
                    <h1 className="text-primary font-bold text-2xl">Done</h1>
                    <p className="my-2">Once your submisson has been accepted you're done, and you wont be required to perform any more actions until next years application becomes available.</p>
                </div>
                <Link to={`/`} className="text-primary hover:text-secondary underline">Return to dashboard</Link>
            </div>
        </div>
    );
};

export default GuidePage;
