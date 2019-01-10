import React from 'react';
import CommentList from './commentlist';
import CommentForm from './commentform';

export default class FloatingImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            path: null,
            label: null,
            desc: null,
        };
    };

    async componentDidMount(){
        const imageId = this.props.match.params.id;

        try{
            const response = await fetch("/img?id=" + imageId);

            if(response.status !== 200)
                throw Error(response.message);

            const body = await response.json();

            this.setState(body);

        }
        catch{
            // TODO
        }
    }

    render() {
        if(!this.state.id)
            return "Loading..."; // TODO

        return (
            <div className="FloatingImageContainer">
                <img alt={this.state.label} className="FloatingImage" src={this.state.path} />
                <p className="FloatingImageLabel">{this.state.label}</p>
                <p className="FloatingImageDescription">{this.state.desc}</p>
                <CommentList id={this.props.match.params.id} />
                <CommentForm id={this.props.match.params.id} />
            </div>
        );
    }
}
