import React from 'react';

export default class FloatingImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const img = this.props.img;

        const visibilityToggle = {
            display: img ? 'initial' : 'none'
        };

        return (
            <div id="FloatingImageBackground" style={visibilityToggle} onClick={ ()=>{this.props.app.selectImageHandler(null)} }>
                <div id="FloatingImageContainer">
                    <img id="FloatingImage" src={img} />
                    <p className="FloatingImageLabel">Selected image: {img}</p>
                    <p className="FloatingImageDescription">asfdasfdasdfasdfasfdafsd</p>
                </div>
            </div>
        );
    }
}
