import React from "react";

import NavBar from "./navbar";
import ImageGrid from "./imagegrid";
import FloatingImage from "./floatingimage";
import Upload from "./upload";

import "./app.css";

export default class App extends React.Component{
    constructor(props){
        super(props);


        this.state = {
            selectedImageID: null,
            displayFloatingImage: false,
            imageList: null,

            fileUploadPromise: null,
        };

        this.selectImageHandler = this.selectImageHandler.bind(this);
        this.toggleFloatingImage = this.toggleFloatingImage.bind(this);
        this.fileDragOverHandler = this.fileDragOverHandler.bind(this);
        this.fileDropHandler = this.fileDropHandler.bind(this);
    }

    componentDidMount() {
        this.getBackendThumbnails().then(thumbs => {
            this.setState({imageList: thumbs});
        });

    };

    getBackendThumbnails = async() => {
        const response = await fetch('/list');
        const body = await response.json();

        if (response.status !==  200) {
            throw Error(body.message)
        }
        return body;
    }

    selectImageHandler(id){
        this.setState({selectedImageID: id, displayFloatingImage: true})
    };

    toggleFloatingImage() {
        this.setState({displayFloatingImage: !this.state.displayFloatingImage})
    };


    fileDragOverHandler(e){
        e.preventDefault();
        console.log("Drag over: ", e);
    }

    // https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
    async fileDropHandler(e){
        e.preventDefault();
        //~ console.log("Drag drop: ",e.dataTransfer.files[0]);

        let resolve_func;
        let reject_func;
        let uploadPromise = new Promise((resolve, reject)=>{
            resolve_func = resolve;
            reject_func = reject;
        });

        this.setState({fileUploadPromise: {resolve: resolve_func, reject: reject_func}});

        e.persist();

        let description = await uploadPromise;


        let formData = new FormData();
        formData.append("image", e.dataTransfer.files[0] );
        formData.append("description", description);

        let send = fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        console.log(send);

        send.then((e)=>{
            console.log("Send succes??");
        });

        send.catch((e)=>{
            console.log("Send error: ", e);
        });

        this.setState({fileUploadPromise:null});
    }

    render(){

        if (this.state.imageList === null) {
            return "Loading";
        }

        return (
            <div className="App" onDragOver={this.fileDragOverHandler} onDrop={this.fileDropHandler}>
                <NavBar />
                <ImageGrid imageList={this.state.imageList} imageClickHandler={this.selectImageHandler}/>
                {
                    this.state.displayFloatingImage 
                    ? <FloatingImage id={this.state.selectedImageID} toggleFloatingImage={this.toggleFloatingImage} />
                    : <></>
                }
                <Upload promiseThingy={this.state.fileUploadPromise} />
            </div>
        )
    };
}
