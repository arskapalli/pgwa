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
        comment.append("user", 1);

        fetch("/comment",{
            method: "POST",
            body: comment,
        });
    }

    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <div className="input-group">
                    <input type="textarea" name="comment" placeholder="Comment" className="form-control"/>
                    <span class="input-group-btn">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </span>
                </div>
            </form>
        );
    }
    
}