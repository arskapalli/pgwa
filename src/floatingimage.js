import React from 'react';

export default class FloatingImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.img === null) {
            return "Ladataan";
        }

        return (
            <div id="FloatingImageBackground" onClick={this.props.toggleFloatingImage}>
                <div id="FloatingImageContainer">
                    <img id="FloatingImage" src={this.props.img.path} />
                    <p className="FloatingImageLabel">{this.props.img.label}</p>
                    <p className="FloatingImageDescription">{this.props.img.desc}</p>
                </div>
            </div>
        );
    }
}
