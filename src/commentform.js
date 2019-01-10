import React from "react"

export default class CommentForm extends React.Component {
    constructor(props){
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(e){
        e.preventDefault();
        const comment = new FormData(e.target);
        comment.append("image", this.props.id);

        fetch("/comment",{
            method: "POST",
            body: comment,
        });
    }

    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <input type="input" name="comment" placeholder="Comment"/>
                <input type="submit" value="Post comment"/>
            </form>
        );
    }
    
}