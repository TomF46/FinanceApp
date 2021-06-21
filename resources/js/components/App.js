import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./DisplayComponents/Header";
import AuthenticatedRoute from "../AuthenticatedRoute";
import DashboardPage from "./Dashboard/Dashboard";
import LoginPage from "./Authentication/Login/LoginPage";

const Main = ({ location }) => (
    <>
        <Header />
        <div className="relative mt-4">
            <div className="sm:px-4 md:px-8">
                <Switch location={location}>
                    <AuthenticatedRoute
                        exact
                        path="/"
                        component={DashboardPage}
                    />
                    <Route path="/login" component={LoginPage} />
                </Switch>
            </div>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);
