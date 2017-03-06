import React, { Component } from 'react';
import Request from 'react-http-request';

import Comment from './Feed-comment';

class LoadFeed extends Component {
    render() {
        return(
            <Request
                url={`https://inloop-webproject.herokuapp.com/api/feeds/${this.props.feed_id}`}
                method='get'
                accept='application/json'
                verbose={true}
            >
                {
                ({error, result, loading}) => {
                    if (error) {
                        return <div>Error<pre>{JSON.stringify(result, null, 2) }</pre></div>;
                    }
                    if (loading) {
                        return <div>loading...</div>;
                    } else {
                        return <div className="container"><ShowDetail feed={result.body} /></div>;
                    }
                }
                }
            </Request>
        );
    }
};

class ShowDetail extends Component {
    render() {
        let feed = this.props.feed;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="feed-detail">
                            <img className="feed-detail-avatar rounded-circle" src={feed.person.avatar} alt="Person avatar" />
                            <div className="feed-detail-body">
                                <h1 className="card-title">{feed.person.firstName} {feed.person.lastName}</h1>
                                <hr />
                                <p className="card-text feed-detail-text">{feed.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment feed_id={feed._id} comments={feed.comments} />
            </div>
        )
    }
};

class ShowFeed extends Component {
    
    render() {
        return(
            <LoadFeed feed_id={this.props.params.feed_id} />
        );
    }
};

export default ShowFeed;