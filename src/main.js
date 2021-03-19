import React from 'react';
import ReactDom from 'react-dom'
import {HashRouter,BrowserRouter, Route, Redirect} from 'react-router-dom'
import { Button, DatePicker, version } from "antd";
import App from './App';
// import "antd/dist/antd.css";
ReactDom.render(<BrowserRouter>
  <Route to="/home" component={App}></Route>
  {/* <Redirect to="/home"></Redirect> */}
</BrowserRouter>,document.getElementById('app'))
