import React from "react";

import Image from "./image";

export default class ImageGrid extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            imageList : null,
        };

        //~ this.scrollHandler = this.scrollHandler.bind(this); // TODO
    }

    async componentDidMount(){
        const response = await fetch('/list');
        const body = await response.json();

        if (response.status !==  200) {
            throw Error(body.message)
        }

        this.setState({imageList : body});
    }

    render(){
        if (!this.state.imageList) {
            return "Loading"; // TODO
        }

        const image_element_list = this.state.imageList.rows.map( (image) => {
            return <Image key={image.ID} id={image.ID} path={image.PATH}/>
        });

        return (

            <div className="ImageGrid" onScroll={this.scrollHandler}>
                {image_element_list}
            </div>
        );
    }
}
