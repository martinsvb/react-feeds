import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';

import {
    hostApi, hostUpload, rxHttp,
    cache,
    showLoader,
    addMessage,
    Validator,
    loggerErr,
    responseHandler,
    Uploader
}
from '../shared/index';

import { setUser } from './index';

@connect((store) => {
  return {
    tr: store.transReducer,
    user: store.userReducer
  };
}, (dispatch) => {
  return {
    showLoader: (val) => {
      dispatch(showLoader(val));
    },
    addMessage: (message) => {
        dispatch(addMessage(message));
    },
    setUser: (user) => {
        dispatch(setUser(user));
    }
  }
})
export class Profile extends Component {
  
  constructor(props) {
    super(props);

    this.props.setUser(cache.get('user') || {});

    this.initModel();
    this.initValidation();

    this.uploadFolder = 'avatars';

    this.handleChange = this.handleChange.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.initModel = this.initModel.bind(this);
    this.initValidation = this.initValidation.bind(this);
  }

  initModel() {
      this.model = {
        'firstName': this.props.user.firstName,
        'lastName': this.props.user.lastName,
        'avatar': this.props.user.avatar,
        'email': this.props.user.email,
        'role': this.props.user.role,
        'chpassword': false,
        'delete': false,
        'password': '',
        'newpassword': '',
        'newrepassword': '',
      };
  }

  initValidation() {
      this.validation = {
        'firstName': {state: '', error: ''},
        'lastName': {state: '', error: ''},
        'email': {state: '', error: ''},
        'role': {state: '', error: ''},
        'password': {state: '', error: ''},
        'newpassword': {state: '', error: ''},
        'newrepassword': {state: '', error: ''},
        'valid': true
      };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.model[name] = value;

    let rules = {
        firstName: {
            required: [this.model.firstName],
            minLength: [3, this.model.firstName]
        },
        lastName: {
            required: [this.model.lastName],
            minLength: [3, this.model.lastName]
        },
        email: {
            required: [this.model.email],
            emailSimple: [this.model.email]
        },
        password: {
            required: [this.model.password],
            minLength: [5, this.model.password]
        },
        newpassword: {
            required: [this.model.newpassword],
            minLength: [5, this.model.newpassword]
        },
        newrepassword: {
            required: [this.model.newrepassword],
            minLength: [5, this.model.newrepassword],
            pair: [this.props.tr.newpassword, this.model.newpassword, this.model.newrepassword]
        }
    };

    let validator = new Validator(this.props.params.lang);
    let valMessage = validator.validate(rules[name]);

    if (this.model.chpassword) {
        this.validation.valid = validator.formValid(rules);
    }
    if (this.model.delete) {
        this.validation.valid = validator.formValid({
            firstName: rules.firstName,
            lastName: rules.lastName,
            email: rules.email,
            password: rules.password,
        });
    }
    if (!this.model.chpassword && !this.model.delete) {
        this.validation.valid = true;
    }
    this.validation[name] = {
        state: valMessage ? 'danger' : 'success',
        error: valMessage ? valMessage : ''
      };

    this.forceUpdate();
  }

  handleUploadChange(uploaded) {
      this.model.avatar = uploaded;
  }

  changeProfile(event) {
      event.preventDefault();
      
      this.props.showLoader(true);
      
      rxHttp.post(`${hostApi}/user`, [this.model]).subscribe(
          (data) => {
            this.props.showLoader(false);
            let message = responseHandler(data, this.props.tr.userTr, {0: 'profileNotChanged', 1: 'profileChanged'});
            if (message.text) {
                this.props.addMessage(message);
            }
          },
          (error) => {
              loggerErr("Login, login", error);
              this.props.showLoader(false);
              this.props.addMessage({type: "danger", text: this.props.tr.userTr.userNotLogged});
          }
      );
  }

    render() {

        return (
          <div className="container">    
              <h1>{this.props.tr.profile}</h1>
              <form onSubmit={this.changeProfile}>
                    <Uploader files={this.model.avatar}
                        type="image"
                        single
                        upload={{host: hostUpload, folder: this.uploadFolder}}
                        uploadLabel={`${this.props.tr.upload} ${this.props.tr.image}`}
                        delLabel={`${this.props.tr.delete} ${this.props.tr.image}`}
                        uploadChange={this.handleUploadChange}
                    />
                  <Row>
                  <Col xs="12" md="6">
                  <FormGroup color={this.validation.firstName.state}>
                      <Label for="firstName">{this.props.tr.firstName}</Label>
                      <Input state={this.validation.firstName.state} type="text" id="firstName" name="firstName" value={this.model.firstName}
                      onChange={this.handleChange} placeholder={this.props.tr.firstName} />
                      <FormFeedback>{this.validation.firstName.error}</FormFeedback>
                  </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                  <FormGroup color={this.validation.lastName.state}>
                      <Label for="lastName">{this.props.tr.lastName}</Label>
                      <Input state={this.validation.lastName.state} type="text" id="lastName" name="lastName" value={this.model.lastName}
                      onChange={this.handleChange} placeholder={this.props.tr.lastName} />
                      <FormFeedback>{this.validation.lastName.error}</FormFeedback>
                  </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col xs="12" md="6">
                  <FormGroup color={this.validation.email.state}>
                    <Label for="email">{this.props.tr.email}</Label>
                      <Input state={this.validation.email.state} type="text" id="email" name="email" value={this.model.email}
                      onChange={this.handleChange} placeholder={this.props.tr.email} disabled />
                      <FormFeedback>{this.validation.email.error}</FormFeedback>
                  </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                  <FormGroup color={this.validation.role.state}>
                    <Label for="role">{this.props.tr.role}</Label>
                      <Input state={this.validation.role.state} type="text" id="role" name="role" value={this.model.role}
                      onChange={this.handleChange} placeholder={this.props.tr.role} disabled />
                      <FormFeedback>{this.validation.role.error}</FormFeedback>
                  </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col xs="12" md="6">
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="chpassword" value={this.model.chpassword} onChange={this.handleChange} disabled={this.model.delete} />{' '}
                            {this.props.tr.changePassword}
                        </Label>
                    </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="delete" value={this.model.delete} onChange={this.handleChange} disabled={this.model.chpassword} />{' '}
                            {this.props.tr.delete}
                        </Label>
                    </FormGroup>
                  </Col>
                  </Row>

                  {(this.model.chpassword || this.model.delete) &&
                  <div>
                  <hr />
                  <FormGroup color={this.validation.password.state}>
                      <Input state={this.validation.password.state} type="password" name="password" value={this.model.password}
                      onChange={this.handleChange} placeholder={this.props.tr.password} />
                      <FormFeedback>{this.validation.password.error}</FormFeedback>
                  </FormGroup>
                  </div>
                  }
                  {this.model.chpassword &&
                    <div>
                  <FormGroup color={this.validation.newpassword.state}>
                      <Input state={this.validation.newpassword.state} type="password" name="newpassword" value={this.model.newpassword}
                      onChange={this.handleChange} placeholder={this.props.tr.newPassword} />
                      <FormFeedback>{this.validation.newpassword.error}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.validation.newrepassword.state}>
                      <Input state={this.validation.newrepassword.state} type="password" name="newrepassword" value={this.model.newrepassword}
                      onChange={this.handleChange} placeholder={this.props.tr.newRepassword} />
                      <FormFeedback>{this.validation.newrepassword.error}</FormFeedback>
                  </FormGroup>
                  </div>
                  }
                  
                  <Row>
                    <Col md="12">
                      <Button color="success" className="ownButton" disabled={!this.validation.valid} title={this.props.tr.submit}>{this.props.tr.submit}</Button>
                    </Col>
                  </Row>
              </form>
          </div>
        )
    }
}
