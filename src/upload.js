import React from "react";
import { Redirect } from "react-router-dom";

export default class Upload extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            uploading : false,
            redirectID: 0,
        };

        this._form = React.createRef();

        this.handleUpload = this.handleUpload.bind(this);
    }

    async handleUpload(e){
        e.preventDefault();

        this.setState({uploading: true});

        try{
            let result = await fetch("/upload", {
                method: "POST",
                body: new FormData(e.target),
            });

            let body = await result.json();

            this.setState({redirectID: body.image});
        }
        catch{
            console.log("Upload error!");
        }
    }

    render()
    {
        if( this.state.redirectID )
            return <Redirect push to={"/image/" + this.state.redirectID} />

        let fieldsetAttributes = [];
        fieldsetAttributes["disabled"] = this.state.uploading ? "disabled" : null;

        return (
            <div className="UploadMain card">
                <div className="card-header">Upload</div>
                <form ref={this._form} className="UploadControls form-group card-body" onSubmit={this.handleUpload}>
                    <fieldset {...fieldsetAttributes}>
                        <div className="form-group">
                            <label className="form-label" for="form-file">File:</label>
                            <input className="form-control-file" id="form-file" type="file" name="image"/>
                        </div>

                        <div className="form-group">
                            <label for="form-label">Label:</label>
                            <input className="form-control" type="text" id="form-label" name="label"/>
                        </div>

                        <div className="form-group">
                            <label for="form-description">Description:</label>
                            <textarea className="form-control" id="form-description" name="description"></textarea>
                        </div>

                        <input className="btn btn-primary" type="submit" value="Upload"/>
                    </fieldset>
                </form>
            </div>
        );
    };
};
