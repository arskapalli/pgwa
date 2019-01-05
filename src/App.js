import React from "react";

import NavBar from "./navbar";
import ImageGrid from "./imagegrid";
import FloatingImage from "./floatingimage";

import "./app.css";

export default class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            selectedImageID: null,
            displayFloatingImage: false
        };

        this.selectImageHandler = this.selectImageHandler.bind(this);
        this.toggleFloatingImage = this.toggleFloatingImage.bind(this);
    }

    selectImageHandler(id){
        this.setState({selectedImageID: id})
        this.setState({displayFloatingImage: true})
    };

    toggleFloatingImage() {
        this.setState({displayFloatingImage: !this.state.displayFloatingImage})
    };

    render(){
        const image_list = Array.apply(null, {length: 100}).map(Number.call, Number);

        return (
            <>
                <NavBar />
                <ImageGrid imageList={image_list} imageClickHandler={this.selectImageHandler}/>
                <FloatingImage img={this.state.selectedImageID} isToggled={this.state.displayFloatingImage} toggleFloatingImage={this.toggleFloatingImage} />
            </>
        )
    };
}
