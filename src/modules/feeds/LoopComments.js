import React, { Component } from 'react';
import moment from 'moment';

import {
    http, baseURL, rxHttp,
    addMessage,
    showLoader
}
from '../shared/index';

import { getFeed } from './action';
import store from '../../redux/store';

class LoopComments extends Component {

  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment(i) {
    
    store.dispatch(showLoader(true));

    rxHttp.delete(`${baseURL}/${this.props.feed_id}/comments/${this.props.comments[i]._id}`).subscribe(
        (response) => {
            rxHttp.get(`${baseURL}/${this.props.feed_id}`)
                .subscribe((response) => {
                    store.dispatch(showLoader(false));
                    store.dispatch(getFeed(response));
                    store.dispatch(addMessage({
                        type: "success",
                        text: "Commet was successfully deleted"
                    }));
                },
                (error) => {
                    console.log(error);
                    store.dispatch(showLoader(false));
                });
        },
        (error) => {
            console.log(error);
            store.dispatch(showLoader(false));
            store.dispatch(addMessage({
                type: "danger",
                text: "Error in deleting comment. Please repeat action."
            }));
        }
    );
  }
    
    render() {
        
        let self = this;

        return (
            <div className="row">
                {this.props.comments.map((comment, i) => (
                        <div key={i} className="col-sm-12">
                            <div className="card feed">
                                <div className="card-block">
                                    <img className="feed-avatar rounded-circle" src={comment.person.avatar} alt="Person avatar" />
                                    <div className="feed-body">
                                        <h4 className="card-title">{comment.person.firstName} {comment.person.lastName}</h4>
                                        <button type="button" className="btn btn-warning float-right" onClick={() => self.deleteComment(i)} title="Delete feed">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                        <p className="card-text feed-timestamp">{moment(comment.date).format('DD. MM. YYYY, h:mm a')}</p>
                                        <div dangerouslySetInnerHTML={{__html: comment.text}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        );
    }
};

export default LoopComments;