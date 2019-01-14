import React from "react";
import { Redirect } from "react-router-dom";
import cookie from "react-cookies";

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {redirect: false};

        this.submitHandler = this.submitHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    async submitHandler(e){
        e.preventDefault();
        const form = e.target;

        form.setAttribute("disable", "");

        try
        {
            const result = await fetch("/login",{
                method: "POST",
                body: new FormData(form),
            });

            if( !result.ok )
                throw "not ok"; // TODO

            const body = await result.json();

            console.log("hmm", body);

            if( !body.success )
                throw "not logged in"; // TODO

            this.setState({redirect: true});
        }
        catch
        {
        }

        form.removeAttribute("disable");
    }

    logoutHandler(){
        cookie.remove("userid");
        this.setState({redirect: true});
    }

    render(){
        if(this.state.redirect)
            return <Redirect to="/" />

        if(cookie.load("userid"))
            return (
                <div className="card m-auto">
                    <div className="card-body">
                        <button onClick={this.logoutHandler}>Logout</button>
                    </div>
                </div>
            );

        return(
            <div className="card m-auto">
                <div className="card-header">Login:</div>
                <form className="card-body" onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label for="username">Username:</label>
                        <input className="form-control" type="input" id="username" name="username"/>
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input className="form-control" type="password" id="password" name="password"/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Login"/>
                    <a className="btn float-right" href="/register">register</a>
                </form>
            </div>
        );
    }
}
