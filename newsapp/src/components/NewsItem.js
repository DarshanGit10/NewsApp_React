import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title, description, imgUrl, newsUrl, author, publishedAt, source} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <span className="position-absolute top-0  translate-middle badge rounded-pill bg-primary" style={{zIndex: "1", left: "90%"}} >
                    {source}</span>
                    <img src={imgUrl?imgUrl:"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"} className="card-img-top" style={{height: "250px"}} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on { new Date(publishedAt).toUTCString()}</small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer " className="btn btn-sm btn-info">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
