import React, { Component } from 'react';
import Request from 'react-http-request';

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
                        <div className="card">
                            <img className="card-img-top" src="..." alt="Card cap" />
                            <div className="card-block">
                                <h4 className="card-title">{feed.person.firstName} {feed.person.lastName}</h4>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
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