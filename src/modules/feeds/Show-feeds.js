import React, { Component } from 'react';
import Request from 'react-http-request';
import { baseURL } from '../request/Request';
import moment from 'moment';
import { Link } from 'react-router';

class ShowFeeds extends Component {
    
    render() {
        return(
            <Request
                url={baseURL}
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
                        
                        let feeds = result.body;

                        return (
                            <div className="container-fluid">
                                <div className="row">
                                {feeds.map(function(feed, i) {
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
                            </div>
                        );
                    }
                }
                }
            </Request>
        );
    }
};

export default ShowFeeds;