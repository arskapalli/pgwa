import React from "react";

import Image from "./image";

export default class ImageGrid extends React.Component{
    constructor(props){
        super(props);

        this.scrollHandler = this.scrollHandler.bind(this);
    }

    scrollHandler(e){
        const grid = e.target;
        const imageSize = grid.firstElementChild.clientWidth;

        const imageRowCount = Math.round(grid.clientWidth / imageSize);

        console.log(imageRowCount);
    }

    render(){

        if (this.props.imageList === null) {
            return "Loading"
        }
        
        const image_element_list = this.props.imageList.rows.map( (image) => {
            return <Image id={image.ID} path={image.PATH} clickHandler={this.props.imageClickHandler}/>
        });
        
        return (
            <div className="ImageGrid" onScroll={this.scrollHandler}>
                {image_element_list}
            </div>
        );
    }
}
