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
            <form onSubmit={this.submitHandler}>
                TODO
                <input type="input" name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" value="Login"/>
            </form>
        );
    }
}
