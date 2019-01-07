import React from "react";

function handleUpload(promise, element)
{
    promise.resolve(element.current.value);
}

export default class Image extends React.Component{
    constructor(props){
        super(props);

        this._descriptionRef = React.createRef();
    }

    render()
    {
        const display = this.props.promiseThingy ? "" : "d-none";

        return (
            <div className={display}>
                <div className={"UploadShade"}></div>
                <div className={"UploadMain"}>
                    <div className={"UploadControls"}>
                        <textarea ref={this._descriptionRef}></textarea>
                        <button onClick={()=>{handleUpload(this.props.promiseThingy, this._descriptionRef)} }>Upload</button>
                    </div>
                </div>
            </div>
        );
    };
};
