import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Feed-comment';

import {
    baseURL, rxHttp,
    showLoader
}
from '../shared/index';

import { getFeed } from './action';
import store from '../../redux/store';

@connect((store) => {
  return {
    feed: store.feedReducer
  };
})
export default class ShowFeedComponent extends Component {

  constructor(props) {
      super(props);
  }
  
  componentDidMount() {
    store.dispatch(showLoader(true));
    rxHttp.get(`${baseURL}/${this.props.params.feed_id}`).subscribe(
        (response) => {
            store.dispatch(showLoader(false));
            store.dispatch(getFeed(response));
        },
        (error) => {
            console.log(error);
            store.dispatch(showLoader(false));
        }
    );
  };

  render() {
    
    return (
        <div className="container">
            {this.props.feed &&
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="feed-detail">
                            <img className="feed-detail-avatar rounded-circle" src={this.props.feed.person.avatar} alt="Person avatar" />
                            <div className="feed-detail-body">
                                <h1 className="card-title">{this.props.feed.person.firstName} {this.props.feed.person.lastName}</h1>
                                <hr />
                                <p className="card-text feed-detail-text">{this.props.feed.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Comment feed_id={this.props.feed._id} comments={this.props.feed.comments} />
            </div>
            }
        </div>
    );
  }
};
