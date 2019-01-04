import React from "react";

import Image from "./image";

export default class ImageGrid extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        const image_element_list = this.props.image_list.map( (image) => {
            return <Image props={image}/>
        });

        return (
            <div>
                {image_element_list}
            </div>
        );
    }
}
