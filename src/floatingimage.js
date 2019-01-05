import React from 'react';

export default class FloatingImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggledOn: false
        };
        this.closeFloatingImage = this.closeFloatingImage.bind(this);
    }

    closeFloatingImage() {
        this.setState(state => ({
            isToggledOn: !state.isToggledOn
        }));
    }

    render() {

        const containerStyle = {
            background: 'rgba(255,255,255,0.7)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            visibility: this.state.isToggledOn ? 'visible' : 'hidden'
        }

        const imgStyle = {
            display: 'block',
            margin: 'auto'
        }

        return (
            <div id="floating-img-container" style={containerStyle} onClick={this.closeFloatingImage}>
                <img className="floating-image" style={imgStyle} src={require('./images/cat.png')} />
            </div>
        );
    }
}