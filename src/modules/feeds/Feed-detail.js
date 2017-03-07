import React, { Component } from 'react';
import request, { baseURL } from '../request/Request';
import Comment from './Feed-comment';

class ShowFeed extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            feed: {
                _id: null,
                person: {
                    firstName: null,
                    lastName: null,
                    avatar: null
                },
                text: null,
                comments: []
            }
        };
    }
    
    componentWillMount() {
        this.getFeed(`${baseURL}/${this.props.params.feed_id}`);
    }

    getFeed(url) {
        let self = this;
        request({
            GET: url,
            headers: {
                "content-type": "application/json"
            }
        }).then((data) => {
            self.setState({feed: JSON.parse(data)});
        }).catch((error) => {
            console.log("Error", error);
        });
    }

    render() {

        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="feed-detail">
                            <img className="feed-detail-avatar rounded-circle" src={this.state.feed.person.avatar || ''} alt="Person avatar" />
                            <div className="feed-detail-body">
                                <h1 className="card-title">{this.state.feed.person.firstName} {this.state.feed.person.lastName}</h1>
                                <hr />
                                <p className="card-text feed-detail-text">{this.state.feed.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment feed_id={this.state.feed._id} comments={this.state.feed.comments} reload={this.getFeed} />
            </div>
        );
    }
};

export default ShowFeed;