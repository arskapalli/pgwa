import React from 'react';
import CommentList from './commentlist';

export default class FloatingImage extends React.Component {
    constructor(props) {
        super(props);

        this._imageRef = React.createRef();
        this._annotations = null;

        this.state = {
            id: null,
            path: null,
            label: null,
            desc: null,
            annotationsEnabled: false,
            annotationsLoaded: false,
        };
        this.loadAnnotations = this.loadAnnotations.bind(this);
        this.imageLoadHandler = this.imageLoadHandler.bind(this)
    };

    async componentDidMount(){

        window.anno.addHandler("onAnnotationCreated", (annotation) => {
            console.log(annotation);
            const data = JSON.stringify([annotation.text, JSON.stringify(annotation.shapes), annotation.context, annotation.src])
            fetch("/annotation", {
                method: "POST",
                body: data,
                headers: { "Content-Type": "application/json" }
            });
        });

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

        try{
            const response = await fetch("/annotation?id=" + imageId);

            if(response.status !== 200)
                throw Error(response.message);

            const body = await response.json();

            this._annotations = body;
            this.setState({annotationsLoaded: true})
        }
        catch{
            // TODO
        }
    }

    imageLoadHandler() {

        this.setState({annotationsEnabled: true});
    }

    loadAnnotations() {
        window.anno.makeAnnotatable(this._imageRef.current);

        //~ console.log("addAnnotations: ", this._annotations);

        for (let i = 0, len = this._annotations.annotations.length; i < len; i++) {
            let annotation = this._annotations.annotations[i]
            let properties = {
                src: annotation.SRC,
                text: annotation.BODY,
                shapes: [{
                    type: annotation.TYPE,
                    geometry: { x: annotation.X, y: annotation.Y, width: annotation.WIDTH, height: annotation.HEIGHT }
                }],
                editable: false
            }
            //~ console.log(properties);
            window.anno.addAnnotation(properties);
        }
    }

    render() {

        if (this.state.annotationsEnabled && this.state.annotationsLoaded) {
            this.loadAnnotations();
        }

        return (
            <div className="FloatingImageContainer card">
                <div className="card-header">
                    {this.state.label}
                </div>

                <img ref={this._imageRef} onLoad={this.imageLoadHandler} alt={this.state.label} id="FloatingImage" src={this.state.path} />

                <div className="list-group">
                    <div className="list-group-item">{this.state.desc}</div>

                    <CommentList id={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}
