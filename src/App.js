import React from "react";

import NavBar from "./navbar";
import ImageGrid from "./imagegrid";
import FloatingImage from "./floatingimage";

import "./app.css";

export default class App extends React.Component{
    constructor(props){
        super(props);

        this.imageList = this.loadImages();


        this.state = {
            selectedImageID: null
        };

        this.selectImageHandler = this.selectImageHandler.bind(this);
        this.loadImages = this.loadImages.bind(this);
    }

    selectImageHandler(id){
        this.setState({selectedImageID: id})
    };

    loadImages(page){
        const images = [
        "images/airplane.png",
        "images/arctichare.png",
        "images/baboon.png",
        "images/barbara.png",
        "images/boat.png",
        "images/cat.png",
        "images/fruits.png",
        "images/frymire.png",
        "images/girl.png",
        "images/goldhill.png",
        "images/lena.png",
        "images/monarch.png",
        "images/mountain.png",
        "images/peppers.png",
        "images/pool.png",
        "images/sails.png",
        "images/serrano.png",
        "images/tulips.png",
        "images/watch.png",
        "images/zelda.png"
        ];

        //~ this.imageList = Array.apply(null, {length: page * 100}).map(Number.call, Number);
        // TEMP TODO

        this.forceUpdate();

        return images;
    }

    render(){
        return (
            <div className="App">
                <NavBar />
                <ImageGrid imageList={this.imageList} imageClickHandler={this.selectImageHandler}/>
                <FloatingImage app={this} img={this.state.selectedImageID} />
            </div>
        )
    };
}
