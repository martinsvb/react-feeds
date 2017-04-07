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
    responseHandler
}
from '../shared/index';

import { setUser } from './index';

@connect((store) => {
  return {
    tr: store.transReducer
  };
}, (dispatch) => {
  return {
    showLoader: (val) => {
      dispatch(showLoader(val));
    },
    addMessage: (message) => {
        dispatch(addMessage(message));
    }
  }
})
export class Profile extends Component {
  
  constructor(props) {
    super(props);

    this.initModel();
    this.initValidation();

    this.handleChange = this.handleChange.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.initModel = this.initModel.bind(this);
    this.initValidation = this.initValidation.bind(this);
  }

  initModel() {
      this.model = {
        'firstName': this.props.user.firstName,
        'lastName': this.props.user.lastName,
        'email': this.props.user.email,
        'role': this.props.user.role,
        'chpassword': false,
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
        'valid': false
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

    this.validation.valid = validator.formValid(rules);
    this.validation[name] = {
        state: valMessage ? 'danger' : 'success',
        error: valMessage ? valMessage : ''
      };

    this.forceUpdate();
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
                  <Row>
                  <Col xs="12" md="6">
                  <FormGroup color={this.validation.firstName.state}>
                      <Input state={this.validation.firstName.state} type="text" name="firstName" value={this.model.firstName}
                      onChange={this.handleChange} placeholder={this.props.tr.firstName} />
                      <FormFeedback>{this.validation.firstName.error}</FormFeedback>
                  </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                  <FormGroup color={this.validation.lastName.state}>
                      <Input state={this.validation.lastName.state} type="text" name="lastName" value={this.model.lastName}
                      onChange={this.handleChange} placeholder={this.props.tr.lastName} />
                      <FormFeedback>{this.validation.lastName.error}</FormFeedback>
                  </FormGroup>
                  </Col>
                  </Row>
                  <FormGroup color={this.validation.email.state}>
                      <Input state={this.validation.email.state} type="text" name="email" value={this.model.email}
                      onChange={this.handleChange} placeholder={this.props.tr.email} />
                      <FormFeedback>{this.validation.email.error}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.validation.role.state}>
                      <Input state={this.validation.role.state} type="text" name="email" value={this.model.role}
                      onChange={this.handleChange} placeholder={this.props.tr.role} disabled />
                      <FormFeedback>{this.validation.role.error}</FormFeedback>
                  </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" name="chpassword" value={this.model.chpassword} onChange={this.handleChange} />{' '}
                            {this.props.tr.changePassword}
                        </Label>
                    </FormGroup>

                  {this.model.chpassword &&
                  <div>
                  <hr />
                  <FormGroup color={this.validation.password.state}>
                      <Input state={this.validation.password.state} type="password" name="password" value={this.model.password}
                      onChange={this.handleChange} placeholder={this.props.tr.password} />
                      <FormFeedback>{this.validation.password.error}</FormFeedback>
                  </FormGroup>
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
                    <Col xs="12" md="6">
                      <Button color="success" className="ownButton" disabled={!this.validation.valid} title={this.props.tr.submit}>{this.props.tr.submit}</Button>
                    </Col>
                  </Row>
              </form>
          </div>
        )
    }
}
