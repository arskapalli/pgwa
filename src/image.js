import React from "react";

export default function Image(props){
    return (
        <span className="Image" onClick={props.clickHandler.bind(this, props.id)}>
            <span className="ImageInner">
                <img src={props.id}></img>
            </span>
        </span>
    );
};
