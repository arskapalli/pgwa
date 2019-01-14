import React from "react";

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(e){
        e.preventDefault();

        fetch("/login",{
            method: "POST",
            body: new FormData(e.target),
        });
    }

    render(){
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
