import React from "react";

import { Link } from "react-router-dom";

export default function Image(props){
    return (
            <span className="Image">
                <Link to={"/image/" + props.id}>
                    <span className="ImageInner">
                        <img alt="TODO" src={props.path}></img>
                    </span>
                </Link>
            </span>

    );
};
