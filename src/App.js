import React from "react";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from "./navbar";
import ImageGrid from "./imagegrid";
import FloatingImage from "./floatingimage";
import Upload from "./upload";
import LoginForm from "./loginform";
import NoMatch from "./nomatch";

import "./app.css";

export default class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <BrowserRouter>
                <div>
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={ImageGrid}/>

                        <Route path="/image/:id" component={FloatingImage}/>
                        <Route exact path="/upload" component={Upload}/>

                        <Route exact path="/login" component={LoginForm}/>

                        <Route component={NoMatch}/> {/* 404 Handler */}
                    </Switch>
                </div>
            </BrowserRouter>
        );
    };
}
