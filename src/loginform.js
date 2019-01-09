import React from "react";

export default class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <form>
                TODO
                <input type="input" name="username" placeholder="Username"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" value="Login"/>
            </form>
        );
    }
}
