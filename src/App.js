import React from "react";

import NavBar from "./navbar";
import ImageGrid from "./imagegrid";

export default class App extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const image_list = [1,2,3,4];

        return (
            <>
                <NavBar />
                <ImageGrid image_list={image_list}/>
                <a href="/demo">Link test</a>
            </>
        )
    };
}
