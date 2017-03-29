import React, { Component } from 'react';
import { Button, FormGroup, Input, FormFeedback } from 'reactstrap';

import {
    baseURL, hostUpload, rxHttp,
    showLoader,
    addMessage,
    Validator,
    Summernote
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
        firstNameState: '',
        firstNameError: '',
        lastName: '',
        lastNameState: '',
        lastNameError: '',
        text: 'Comment...',
        uploadFolder: "test_company/news"
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
        },
        lastName: {
            regex: [/\W/g, value, true]
        }
    };
    
    let validator = new Validator(rules[name]);
    let valMessage = validator.validate();

    this.setState({
        [name]: value,
        [`${name}State`]: valMessage ? 'danger' : 'success',
        [`${name}Error`]: valMessage ? valMessage : ''
    });
  }

  handleSummernote(value, name) {
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
    rxHttp.post(`${baseURL}/${this.props.feed_id}/comments`, data).subscribe(
        (response) => {
            rxHttp.get(`${baseURL}/${this.props.feed_id}`).subscribe(
                (response) => {
                    store.dispatch(showLoader(false));
                    store.dispatch(getFeed(response));
                    store.dispatch(addMessage({
                        type: "success",
                        text: "Commet was successfully saved"
                    }));
                    this.setState({
                        firstName: '',
                        firstNameState: '',
                        firstNameError: '',
                        lastName: '',
                        lastNameState: '',
                        lastNameError: '',
                        text: 'Comment...'
                    });
                },
                (error) => {
                    console.log(error);
                    store.dispatch(showLoader(false));
                }
            );
        },
        (error) => {
            console.log(error);
            store.dispatch(showLoader(false));
            store.dispatch(addMessage({
                type: "danger",
                text: "Error in saving comment. Please repeat action."
            }));
        }
    );
  }
    
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup color={this.state.firstNameState}>
                        <Input state={this.state.firstNameState} type="text" name="firstName" value={this.state.firstName}
                        onChange={this.handleChange} placeholder="First Name" />
                        <FormFeedback>{this.state.firstNameError}</FormFeedback>
                    </FormGroup>
                    <FormGroup color={this.state.lastNameState}>
                        <Input state={this.state.lastNameState} type="text" name="lastName" value={this.state.lastName}
                        onChange={this.handleChange} placeholder="Last Name" />
                        <FormFeedback>{this.state.lastNameError}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Summernote name="text" value={this.state.text} onChange={(value, name) => this.handleSummernote(value, name)} upload={{host: hostUpload, folder: this.state.uploadFolder}} />
                    </FormGroup>
                    <Button className="btn-warning addComment" title="Add feed">add comment</Button>
                </form>
                <LoopComments feed_id={this.props.feed_id} comments={this.props.comments} />
            </div>
        );
    }
}
