import React from "react"

export default class CommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentList: null
        };
    }

    async componentDidMount(){
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
            <ul className="list-group">
                {this.state.commentList.map(comment => (
                    <li key={comment.ID} className="list-group-item">
                        {comment.BODY}
                    </li>
                ))}
            </ul>
        );
    };
}