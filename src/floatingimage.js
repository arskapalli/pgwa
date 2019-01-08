import React from 'react';
import { isNumber } from "util";

export default class FloatingImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            label: null,
            desc: null
        };
        this.getBackendImage = this.getBackendImage.bind(this);
    };

    getBackendImage = async(id) => {
        const response = await fetch('/img?id='+id);
        const body = await response.json();

        if (response.status !==  200) {
            throw Error(body.message)
        }
        return body;
    }

    render() {

        if (this.props.id && isNumber(this.props.id) && this.state.path === null) {
            this.getBackendImage(this.props.id)
                .then(res => this.setState({ path: res.path, label: res.label, desc: res.desc, displayFloatingImage: true }))
                .catch(err => console.log(err));
        }

        return (
            <div id="FloatingImageBackground" onClick={this.props.toggleFloatingImage}>
                <div id="FloatingImageContainer">
                    <img id="FloatingImage" src={this.state.path} />
                    <p className="FloatingImageLabel">{this.state.label}</p>
                    <p className="FloatingImageDescription">{this.state.desc}</p>
                </div>
            </div>
        );
    }
}
