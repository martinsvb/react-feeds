import React, { Component } from 'react';
import { Button, FormGroup, Input, FormFeedback } from 'reactstrap';

import {
    http, baseURL, rxRes,
    showLoader,
    Message, addMessage,
    Validator
}
from '../shared/index';

import LoopComments from './LoopComments';
import { getFeed } from './action';
import store from '../../redux/store';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        firstNameError: '',
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
    
    let rules = {
        firstName: {
            required: [value],
            minLength: [5, value]
        }
    };

    let validator = new Validator(target, rules[name]);
    let valMessage = validator.validate();

    this.setState({[`${name}Error`]: valMessage ? valMessage : ''});

    this.setState({[name]: value});
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
    rxRes(http.post(`${baseURL}/${this.props.feed_id}/comments`, data))
        .subscribe((response) => {
            rxRes(http.get(`${baseURL}/${this.props.feed_id}`))
                .subscribe((response) => {
                    store.dispatch(showLoader(false));
                    store.dispatch(getFeed(response));
                    store.dispatch(addMessage({
                        type: "success",
                        text: "Commet was successfully saved"
                    }));
                    self.setState({
                        firstName: '',
                        lastName: '',
                        text: 'Comment...'
                    });
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
                text: "Error in saving comment. Please repeat action."
            }));
        });
  }
    
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" />
                        <FormFeedback>{this.state.firstNameError}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" />
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" rows="5" name="text" value={this.state.text} onChange={this.handleChange} />
                    </FormGroup>
                    <Button className="btn-warning addComment" title="Add feed">add comment</Button>
                </form>
                <Message />
                <LoopComments feed_id={this.props.feed_id} comments={this.props.comments} />
            </div>
        );
    }
};
