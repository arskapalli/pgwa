import React from "react";

import NavBar from "./navbar";
import ImageGrid from "./imagegrid";

import "./app.css";

export default class App extends React.Component{
    constructor(props){
        super(props);

        this.selectImageHandler = this.selectImageHandler.bind(this);
    }

    selectImageHandler(id){
        alert("select image: " + id);
    }

    render(){
        const image_list = Array.apply(null, {length: 100}).map(Number.call, Number);

        return (
            <>
                <NavBar />
                <ImageGrid imageList={image_list} imageClickHandler={this.selectImageHandler}/>
            </>
        )
    };
}
