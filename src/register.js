import React from "react";
import { Redirect } from "react-router-dom";

export default class RegisterForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {redirect: false};

        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(e){
        e.preventDefault();
        const form = e.target;

        form.setAttribute("disable", "");

        try
        {
            const result = await fetch("/register",{
                method: "POST",
                body: new FormData(form),
            });

            if( !result.ok )
                throw "not ok"; // TODO

            const body = await result.json();

            if( !body.success )
                throw "not registered in"; // TODO

            this.setState({redirect: true});
        }
        catch
        {
        }

        form.removeAttribute("disable");
    }

    render(){
        if(this.state.redirect)
            return <Redirect to="/" />

        return(
            <div className="card m-auto">
                <div className="card-header">Register:</div>
                <form className="card-body" onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label for="username">Username:</label>
                        <input className="form-control" type="input" id="username" name="username"/>
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input className="form-control" type="password" id="password" name="password"/>
                    </div>
                    <div className="form-group">
                        <label for="password2">Repeat password:</label>
                        <input className="form-control" type="password" id="password2"/>
                    </div>
                    <input className="btn btn-primary" type="submit" value="Register"/>
                </form>
            </div>
        );
    }
}
