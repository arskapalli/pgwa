import React from "react";

import NavBar from "./navbar";
import ImageGrid from "./imagegrid";
import FloatingImage from "./floatingimage";

import "./app.css";
import { isNumber } from "util";

export default class App extends React.Component{
    constructor(props){
        super(props);


        this.state = {
            path: null,
            label: null,
            desc: null,
            displayFloatingImage: false,
            imageList: null
        };

        this.selectImageHandler = this.selectImageHandler.bind(this);
        this.toggleFloatingImage = this.toggleFloatingImage.bind(this);
    }

    componentDidMount() {
        this.getBackendThumbnails().then(thumbs => {
            this.setState({imageList: thumbs});
        });

    };

    getBackendImage = async(id) => {
        const response = await fetch('/img?id='+id);
        const body = await response.json();

        if (response.status !==  200) {
            throw Error(body.message)
        }
        return body;
    }

    getBackendThumbnails = async() => {
        const response = await fetch('/list');
        const body = await response.json();

        if (response.status !==  200) {
            throw Error(body.message)
        }
        return body;
    }

    selectImageHandler(id){
        console.log(id);
        if (id && isNumber(id)) {
            this.getBackendImage(id)
                .then(res => this.setState({ path: res.path, label: res.label, desc: res.desc, displayFloatingImage: true }))
                .catch(err => console.log(err));
        }
    };

    toggleFloatingImage() {
        this.setState({displayFloatingImage: !this.state.displayFloatingImage})
    };

    render(){

        if (this.state.imageList === null) {
            return "Loading";
        }

        let img = {
            path: this.state.path,
            label: this.state.label,
            desc: this.state.desc
        };

        return (
            <div className="App">
                <NavBar />
                <ImageGrid imageList={this.state.imageList} imageClickHandler={this.selectImageHandler}/>
                <FloatingImage img={img} isToggled={this.state.displayFloatingImage} toggleFloatingImage={this.toggleFloatingImage} />
            </div>
        )
    };
}
