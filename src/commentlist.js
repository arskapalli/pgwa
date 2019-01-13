import React from "react"

import CommentForm from './commentform';

export default class CommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentList: null
        };

        this.updateComments = this.updateComments.bind(this);
    }

    componentDidMount(){
        this.updateComments();
    }

    async updateComments(){
        const imageId = this.props.id;

        try{
            const response = await fetch("/comment?id=" + imageId);

            if(response.status !== 200)
                throw Error(response.message);

            const body = await response.json();

            this.setState({commentList: body.comments});

        }
        catch{
            // TODO
        }
    }

    render () {
        if (!this.state.commentList) {
            return "Loading";
        }
        return (
            <>
                <CommentForm id={this.props.id} updateComments={this.updateComments}/>

                <ul className="list-group">
                    {this.state.commentList.map(comment => (
                        <li key={comment.ID} className="list-group-item">
                            <h6>
                                {comment.BODY}
                            </h6>
                            <p className="text-muted">
                                {comment.USERNAME} - {comment.TIMESTAMP}
                            </p>
                        </li>
                    ))}
                </ul>
            </>
        );
    };
}
