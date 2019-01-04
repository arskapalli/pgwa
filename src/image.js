import React from "react";

export default function Image(props){
    return (
        <span className="Image" onClick={props.clickHandler.bind(this, props.id)}>Image {props.id}</span>
    );
};
