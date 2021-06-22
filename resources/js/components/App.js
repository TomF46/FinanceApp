import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./DisplayComponents/Header";
import AuthenticatedRoute from "../AuthenticatedRoute";
import AdminRoute from "../AdminRoute";

import DashboardPage from "./Dashboard/Dashboard";
import LoginPage from "./Authentication/Login/LoginPage";
import HeadOfficeRegisterPage from "./Dashboard/AdminDashboard/UsersManagement/HeadOfficeAdmin/HeadOfficeRegisterPage";
import AreaManagerRegisterPage from "./Dashboard/AdminDashboard/UsersManagement/AreaManagerAdmin/AreaManagerRegisterPage";
import RetailManagerRegisterPage from "./Dashboard/AdminDashboard/UsersManagement/RetailManagerAdmin/RetailManagerRegisterPage";
import UsersManagementPage from "./Dashboard/AdminDashboard/UsersManagement/UserManagementPage.js";
import LocationsManagementPage from "./Dashboard/AdminDashboard/LocationsManagement/LocationsManagementPage";
import AreaCreatePage from "./Dashboard/AdminDashboard/LocationsManagement/AreasManagement/AreaCreatePage";
import RetailLocationCreatePage from "./Dashboard/AdminDashboard/LocationsManagement/RetailLocationManagement/RetailLocationCreatePage";

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
                    <AdminRoute
                        path="/admin/users/headOffice/register"
                        component={HeadOfficeRegisterPage}
                    />
                    <AdminRoute
                        path="/admin/users/areaManager/register"
                        component={AreaManagerRegisterPage}
                    />
                    <AdminRoute
                        path="/admin/users/retailManager/register"
                        component={RetailManagerRegisterPage}
                    />
                    <AdminRoute
                        path="/admin/users"
                        component={UsersManagementPage}
                    />
                    <AdminRoute
                        path="/admin/locations/areas/create"
                        component={AreaCreatePage
                        }
                    />
                    <AdminRoute
                        path="/admin/locations/retail/create"
                        component={RetailLocationCreatePage
                        }
                    />
                    <AdminRoute
                        path="/admin/locations"
                        component={LocationsManagementPage
                        }
                    />
                </Switch>
            </div>
        </div>
        <ToastContainer autoClose={3000} hideProgressBar />
    </>
);
export default withRouter(Main);
