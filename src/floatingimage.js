import React from 'react';

export default class FloatingImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.img === null) {
            return "Ladataan";
        }

        const visibilityToggle = {
            visibility: this.props.isToggled ? 'visible' : 'hidden'
        }

        return (
            <div id="FloatingImageBackground" style={visibilityToggle} onClick={this.props.toggleFloatingImage}>
                <div id="FloatingImageContainer">
                    <img id="FloatingImage" src={this.props.img.path} />
                    <p className="FloatingImageLabel">{this.props.img.label}</p>
                    <p className="FloatingImageDescription">{this.props.img.desc}</p>
                </div>
            </div>
        );
    }
}