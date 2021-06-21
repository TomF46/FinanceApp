import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "./Home/Home";

const Main = ({ location }) => (
    <>
        {/* <Header /> */}
        <div className="relative mt-4">
            <div className="sm:px-4 md:px-8">
                <Switch location={location}>
                    <Route path="/" component={HomePage} />
                </Switch>
            </div>
        </div>
    </>
);
export default withRouter(Main);
