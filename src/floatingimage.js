import React from 'react';

export default class FloatingImage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const img = this.props.img

        const visibilityToggle = {
            visibility: this.props.isToggled ? 'visible' : 'hidden'
        }

        return (
            <div id="FloatingImageBackground" style={visibilityToggle} onClick={this.props.toggleFloatingImage}>
                <div id="FloatingImageContainer">
                    {/*<img id="FloatingImage" src={require('./images/cat.png')} />*/}
                    <p className="FloatingImageLabel">Selected image: {img}</p>
                    <p className="FloatingImageDescription">asfdasfdasdfasdfasfdafsd</p>
                </div>
            </div>
        );
    }
}