import React, { Component } from 'react';
import Request from 'react-http-request';
import moment from 'moment';

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
                        return <div>Error<pre>{JSON.stringify(result, null, 2) }</pre></div>;
                    }
                    if (loading) {
                        return <div>loading...</div>;
                    } else {
                        return <div className="container-fluid"><LoopFeeds data={result.body} /></div>;
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
            {this.props.data.map(function(feed, i) {
                return (
                    <div key={i} className="col-sm-12 col-md-4 col-xl-3">
                        <div className="card feeds">
                            <div className="card-block">
                                <img className="feeds-avatar rounded-circle" src={feed.person.avatar} alt="Person avatar" />
                                <div className="feeds-body">
                                    <h4 className="card-title">{feed.person.firstName} {feed.person.lastName}</h4>
                                    <a href="#" className="btn btn-warning float-right">Detail</a>
                                    <p className="card-text feeds-timestamp">{moment(feed.date).format('DD. MM. YYYY, h:mm a')}</p>
                                    <p className="card-text feeds-text">{feed.text}</p>
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