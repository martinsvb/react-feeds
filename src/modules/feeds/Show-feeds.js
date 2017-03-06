import React, { Component } from 'react';
import Request from 'react-http-request';
import moment from 'moment';
import { Link } from 'react-router';

class LoadFeeds extends Component {
    render() {
        return(
            <Request
                url='https://inloop-webproject.herokuapp.com/api/feeds'
                method='get'
                accept='application/json'
                verbose={true}
            >
                {
                ({error, result, loading}) => {
                    if (error) {
                        return <div>Error<pre>{JSON.stringify(error, null, 2) }</pre></div>;
                    }
                    if (loading) {
                        return <div>loading...</div>;
                    } else {
                        return <div className="container-fluid"><LoopFeeds feeds={result.body} /></div>;
                    }
                }
                }
            </Request>
        );
    }
};

class LoopFeeds extends Component {
    render() {
        return (
            <div className="row">
            {this.props.feeds.map(function(feed, i) {
                return (
                    <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="card feed">
                            <div className="card-block">
                                <img className="feed-avatar rounded-circle" src={feed.person.avatar} alt="Person avatar" />
                                <div className="feed-body">
                                    <h4 className="card-title">{feed.person.firstName} {feed.person.lastName}</h4>
                                    <Link to={`/feed-detail/${feed._id}`} className="btn btn-warning float-right" activeClassName="active-link" title="Add feed">Detail</Link>
                                    <p className="card-text feed-timestamp">{moment(feed.date).format('DD. MM. YYYY, h:mm a')}</p>
                                    <p className="card-text feed-text">{feed.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        );
    }
};

class ShowFeeds extends Component {
    render() {
        return(
            <LoadFeeds />
        );
    }
};

export default ShowFeeds;