import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Link, Route, Switch } from "react-router-dom";
import Main from "./components/App";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { render } from "react-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import history from "./history"

const store = configureStore();

render(
    <ReduxProvider store={store}>
        <Router history={history}>
            <Main component={Main} />
        </Router>
    </ReduxProvider>,
    document.getElementById("index")
);
