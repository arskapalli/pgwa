import React from 'react';
import CommentList from './commentlist';

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
        return (
            <div className="FloatingImageContainer card">
                <div className="card-header">
                    {this.state.label}
                </div>

                <img alt={this.state.label} className="FloatingImage" src={this.state.path} />

                <div className="list-group">
                    <div className="list-group-item">{this.state.desc}</div>

                    <CommentList id={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}
