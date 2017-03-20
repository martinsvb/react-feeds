import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Feed-comment';

import http, { baseURL } from '../request/Request';
import Loader from '../shared/loader/loader';
import { showLoader } from '../shared/loader/action';
import { getFeed } from './action';
import store from '../../redux/store';

class ShowFeedComponent extends Component {

  constructor(props) {
      super(props);
  }
  
  componentDidMount() {
    http.get(`${baseURL}/${this.props.params.feed_id}`)
        .then((response) => {
            store.dispatch(showLoader(false));
            store.dispatch(getFeed(response));
        })
        .catch((error) => {
            store.dispatch(showLoader(false));
        });
  };

  render() {
    
    return (
        <div className="container">
            <Loader />
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

const mapStateToProps = (store) => {
  return {
    feed: store.feedReducer
  };
};

const ShowFeed = connect(mapStateToProps)(ShowFeedComponent);

export default ShowFeed;