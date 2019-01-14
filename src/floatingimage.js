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
            annotations: null,
            annotationsLoaded: false
        };
        this.loadAnnotations = this.loadAnnotations.bind(this);
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

            this.setState({annotations: body})

        }
        catch{
            // TODO
        }


    }

    imageLoadHandler() {
        window.anno.makeAnnotatable(document.getElementById("FloatingImage"));
    }

    loadAnnotations() {
        console.log(this.state.annotations.annotations.length)
        for (let i = 0, len = this.state.annotations.annotations.length; i < len; i++) {
            let annotation = this.state.annotations.annotations[i]
            let properties = {
                src: annotation.SRC,
                text: annotation.BODY,
                shapes: [{
                    type: annotation.TYPE,
                    geometry: { x: annotation.X, y: annotation.Y, width: annotation.WIDTH, height: annotation.HEIGHT }
                }],
                editable: false
            }
            console.log(properties);
            window.anno.addAnnotation(properties);
        }
        this.setState({annotations: null, annotationsLoaded: true});
    }

    render() {

        if (this.state.annotations) {
            console.log(this.state.annotations)
            this.loadAnnotations();
        }

        return (
            <div className="FloatingImageContainer card">
                <div className="card-header">
                    {this.state.label}
                </div>

                <img onLoad={this.imageLoadHandler.bind(this)} alt={this.state.label} id="FloatingImage" src={this.state.path} />

                <div className="list-group">
                    <div className="list-group-item">{this.state.desc}</div>

                    <CommentList id={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}
