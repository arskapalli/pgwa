import React from "react";

import { Link } from 'react-router-dom';

export default class NavBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="Navbar">
                <Link to="/"><h1>PGWA</h1></Link>
                <Link to="/upload"><span>Upload</span></Link>
                <Link to="/login"><span>Login</span></Link>
            </div>
        );
    }
}
