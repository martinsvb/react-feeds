import React, { Component } from 'react';
import moment from 'moment';
import http, { baseURL } from '../request/Request';

import LoopComments from './LoopComments';
import Loader from '../shared/loader/loader';
import { showLoader } from '../shared/loader/action';
import Message from '../shared/message/message';
import { setMessage } from '../shared/message/action';
import { getFeed } from './action';
import store from '../../redux/store';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        text: 'Comment...'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    store.dispatch(showLoader(true));
    
    let data = {
        "text": this.state.text,
        "person": {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName
        }
    }
    let self = this;
    http.post(`${baseURL}/${this.props.feed_id}/comments`, data)
        .then((response) => {
            http.get(`${baseURL}/${this.props.feed_id}`)
                .then((response) => {
                    store.dispatch(showLoader(false));
                    store.dispatch(getFeed(response));
                    store.dispatch(setMessage({
                        type: "success",
                        text: "Commet was successfully saved"
                    }));
                    self.setState({
                        firstName: '',
                        lastName: '',
                        text: 'Comment...'
                    });
                })
                .catch((error) => {
                    store.dispatch(showLoader(false));
                });
            })
        .catch((error) => {
            store.dispatch(showLoader(false));
            store.dispatch(setMessage({
                type: "danger",
                text: "Error in saving comment. Please repeat action."
            }));
        });
  }
    
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" name="text" rows="5" value={this.state.text} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-warning addComment" title="Delete feed">
                        add comment
                    </button>
                    <Loader />
                    <Message />
                </form>
                <LoopComments feed_id={this.props.feed_id} comments={this.props.comments} />
            </div>
        );
    }
};
