import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import http, { baseURL } from '../request/Request';
import Loader from '../shared/loader/loader';
import { showLoader } from '../shared/loader/action';
import { getFeeds } from './action';
import store from '../../redux/store';

class ShowFeedsComponent extends Component{

  constructor(props) {
      super(props);
  }
  
  componentDidMount() {
    store.dispatch(showLoader(true));

    http.get(`${baseURL}`)
    .then((response) => {
        store.dispatch(showLoader(false));
        store.dispatch(getFeeds(response));
    })
    .catch((error) => {
        store.dispatch(showLoader(false));
    });
  };

  render() {
    
    return (
        <div className="container-fluid">
            <Loader />
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
        </div>
    );
  }
};

const mapStateToProps = (store) => {
  return {
    feeds: store.feedsReducer
  };
};

const ShowFeeds = connect(mapStateToProps)(ShowFeedsComponent);

export default ShowFeeds;