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
                <div className="panel panel-default"> {/* WHY U NO WORKING */}
                    <div className="panel-heading">{this.state.label}</div>
                    <div className="panel-body">{this.state.desc}</div>
                    <CommentList id={this.props.match.params.id} />
                </div>
                <CommentForm id={this.props.match.params.id} />
            </div>
        );
    }
}
