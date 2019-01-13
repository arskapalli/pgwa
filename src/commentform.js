import React from "react"

export default class CommentForm extends React.Component {
    constructor(props){
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(e){
        e.preventDefault();

        const form = e.target;

        form.setAttribute("disabled", "");

        const comment = new FormData(form);
        comment.append("image", this.props.id);
        comment.append("user", 1);

        try{
            const response = await fetch("/comment",{
                method: "POST",
                body: comment,
            });

            if( !response.ok )
                throw "Not ok";

            this.props.updateComments();
            form.elements.comment.value = "";
        }
        catch{
            console.log("Catching");
        }

        form.removeAttribute("disabled");
    }

    render(){
        return(
            <form className="list-group-item" onSubmit={this.submitHandler}>
                <div className="input-group">
                    <input type="textarea" name="comment" placeholder="Comment" className="form-control"/>
                    <span className="input-group-append">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </span>
                </div>
            </form>
        );
    }

}
