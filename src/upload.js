import React from "react";

export default class Upload extends React.Component{
    constructor(props){
        super(props);

        this._fileRef = React.createRef();
        this._descriptionRef = React.createRef();

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(){
        let formData = new FormData();
        formData.append("image", this._fileRef.current.files[0] );
        formData.append("description", this._descriptionRef.current.value);

        let send = fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        // TODO
        send.then((e)=>{
            console.log("Send succes??");
        });

        send.catch((e)=>{
            console.log("Send error: ", e);
        });
    }

    render()
    {
        return (
            <>
                {/* <div className={"UploadShade"}></div> */}
                <div className={"UploadMain"}>
                    <div className={"UploadControls"}>
                        <input type="file" ref={this._fileRef}/>
                        <textarea ref={this._descriptionRef}></textarea>
                        <button onClick={this.handleUpload}>Upload</button>
                    </div>
                </div>
            </>
        );
    };
};
