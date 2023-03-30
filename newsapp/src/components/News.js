import React, { Component } from "react";
import NewsItem from "./NewsItem";
import loading from "./Spinner-3.gif";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
        document.title = `${this.props.category} - News App`;
    }

    async updateNews() {
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsData = await data.json();
        this.props.setProgress(70);
        // console.log(parsData)
        this.setState({
            articles: parsData.articles,
            totalResults: parsData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    //   handlePervClick = async () => {
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    //   };

    //   handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    //   };

    fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
            }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1
            }&pageSize=${this.props.pageSize}`;
        this.setState({
            page: this.state.page + 1,
        });
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsData = await data.json();
        // console.log(parsData)
        this.setState({
            articles: this.state.articles.concat(parsData.articles),
            totalResults: parsData.totalResults,
            loading: false,
        });
    };

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ marginTop: "70px" }}>
                    News App: Top {this.props.category} Headlines
                </h1>
                {/* {this.state.loading && <div className="text-center" >
                    <img src={loading} alt="" />
                </div>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={
                        this.state.loading && (
                            <div className="text-center">
                                <img src={loading} alt="" />
                            </div>
                        )
                    }
                >
                    <div className="row">
                        {this.state.articles.map((ele) => {
                            return (
                                <div className="col-md-4" key={ele.url}>
                                    {ele && (
                                        <NewsItem
                                            title={ele.title ? ele.title.slice(0, 45) : ""}
                                            description={
                                                ele.description ? ele.description.slice(0, 80) : ""
                                            }
                                            imgUrl={ele.urlToImage}
                                            newsUrl={ele.url}
                                            author={ele.author}
                                            publishedAt={ele.publishedAt}
                                            source={ele.source.name}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-secondary" onClick={this.handlePervClick} >&larr; Pervious</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-secondary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        );
    }
}

News.defaultProps = {
    country: "in",
    category: "entertainment",
    pageSize: 10,
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News;
