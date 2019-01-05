import React from "react";

import NavBar from "./navbar";
import ImageGrid from "./imagegrid";
import FloatingImage from "./floatingimage";

import "./app.css";

export default class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            path: "",
            label: "",
            desc: "",
            displayFloatingImage: false
        };

        this.selectImageHandler = this.selectImageHandler.bind(this);
        this.toggleFloatingImage = this.toggleFloatingImage.bind(this);
    }

    getBackendImage = async(id) => {
        const response = await fetch('/img?id='+id);
        const body = await response.json();

        if (response.status !==  200) {
            throw Error(body.message)
        }
        return body;
    }

    selectImageHandler(id){
        this.getBackendImage(id)
            .then(res => this.setState({ path: res.path, label: res.label, desc: res.desc, displayFloatingImage: true }))
            .catch(err => console.log(err));
    };

    toggleFloatingImage() {
        this.setState({displayFloatingImage: !this.state.displayFloatingImage})
    };

    render(){
        const image_list = Array.apply(null, {length: 100}).map(Number.call, Number);
        let img = {
            path: this.state.path,
            label:this.state.label,
            desc:this.state.desc
        };

        return (
            <>
                <NavBar />
                <ImageGrid imageList={image_list} imageClickHandler={this.selectImageHandler}/>
                <FloatingImage img={img} isToggled={this.state.displayFloatingImage} toggleFloatingImage={this.toggleFloatingImage} />
            </>
        )
    };
}
