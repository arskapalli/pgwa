import React from "react";

import Image from "./image";

export default class ImageGrid extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const image_element_list = this.props.imageList.map( (id) => {
            return <Image id={id} clickHandler={this.props.imageClickHandler}/>
        });

        return (
            <div className="d-flex flex-wrap">
                {image_element_list}
            </div>
        );
    }
}
