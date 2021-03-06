import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';

import {
    baseURL, rxHttp, 
    showLoader
}
from '../shared/index';

import { getFeeds } from './action';
import store from '../../redux/store';

@connect((store) => {
  return {
    feeds: store.feedsReducer,
    tr: store.transReducer
  };
}, (dispatch) => {
  return {
    showLoader: (val) => {
      dispatch(showLoader(val));
    }
  }
})
export default class ShowFeedsComponent extends Component{

  constructor(props) {
      super(props);
  }
  
  componentDidMount() {
    this.props.showLoader(true);
    rxHttp.get(`${baseURL}`).subscribe(
        (response) => {
            this.props.showLoader(false);
            store.dispatch(getFeeds(response));
        },
        (error) => {
            console.log(error);
            this.props.showLoader(false);
        }
    );
  };

  render() {
    
    return (
        <div className="container-fluid">
            <div className="row">
                {this.props.feeds.map((feed, i) => {
                    return (
                        <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                            <div className="card feed">
                                <div className="card-block">
                                    <img className="feed-avatar rounded-circle" src={feed.person.avatar} alt="Person avatar" />
                                    <div className="feed-body">
                                        <h4 className="card-title">{feed.person.firstName} {feed.person.lastName}</h4>
                                        <Link to={`/${this.props.lang}/feed-detail/${feed._id}`} className="btn btn-warning float-right" activeClassName="active-link" title="Add feed">Detail</Link>
                                        <p className="card-text feed-timestamp">{moment(feed.date).format('DD. MM. YYYY, h:mm a')}</p>
                                        <p className="card-text feed-text">{feed.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })};
            </div>
        </div>
    );
  }
};
