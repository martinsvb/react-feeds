import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup, Input, FormFeedback } from 'reactstrap';

import {
    hostApi, hostUpload, rxHttp,
    showLoader,
    addMessage,
    Validator,
    loggerErr
}
from '../shared/index';

import store from '../../redux/store';

@connect((store) => {
  return {
    lang: store.langReducer,
    tr: store.transReducer
  };
}, (dispatch) => {
  return {
    showLoader: (val) => {
        dispatch(showLoader(val));
    },
    addMessage: (obj) => {
        dispatch(addMessage(obj));
    }
  }
})
export class Register extends Component {

    constructor(props) {
        super(props);

        this.initModel();
        this.initValidation();

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.initModel = this.initModel.bind(this);
        this.initValidation = this.initValidation.bind(this);
    }

    initModel() {
        this.model = {
          'name': '',
          'email': '',
          'password': '',
          'repassword': ''
        };
    }

    initValidation() {
        this.validation = {
          'name': {state: '', error: ''},
          'email': {state: '', error: ''},
          'password': {state: '', error: ''},
          'repassword': {state: '', error: ''},
          'valid': false
        };
    }

    register(event) {
      event.preventDefault();
      
      this.props.showLoader(true);
      rxHttp.post(`${hostApi}/register/lang/${this.props.lang}`, [this.model]).subscribe(
          (data) => {
                <Response data={data} info={{'0': 'userRegistrationError', '1': 'userRegistered'}} />
                this.initModel();
                this.initValidation();
                this.forceUpdate();
          },
          (error) => {
              loggerErr("Register, register", error);
              this.props.showLoader(false);
              this.props.addMessage({
                  type: "danger",
                  text: this.props.tr.userRegistrationError
              });
          }
      );
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      this.model[name] = value;

      let rules = {
          name: {
              required: [this.model.name],
              minLength: [3, this.model.name]
          },
          email: {
              required: [this.model.email],
              emailSimple: [this.model.email]
          },
          password: {
              required: [this.model.password],
              minLength: [5, this.model.password]
          },
          repassword: {
              required: [this.model.repassword],
              minLength: [5, this.model.repassword],
              pair: [this.props.tr.password, this.model.password, this.model.repassword]
          }
      };
      
      let validator = new Validator(this.props.lang);
      let valMessage = validator.validate(rules[name]);

      this.validation.valid = validator.formValid(rules);
      this.validation[name] = {
          state: valMessage ? 'danger' : 'success',
          error: valMessage ? valMessage : ''
        };

      this.forceUpdate();
    }

    render() {

        return (
          <div className="container">    
              <h1>{this.props.tr.register}</h1>
              <form onSubmit={this.register}>
                  <FormGroup color={this.validation.name.state}>
                      <Input state={this.validation.name.state} type="text" name="name" value={this.model.name}
                      onChange={this.handleChange} placeholder={this.props.tr.name} />
                      <FormFeedback>{this.validation.name.error}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.validation.email.state}>
                      <Input state={this.validation.email.state} type="text" name="email" value={this.model.email}
                      onChange={this.handleChange} placeholder={this.props.tr.email} />
                      <FormFeedback>{this.validation.email.error}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.validation.password.state}>
                      <Input state={this.validation.password.state} type="password" name="password" value={this.model.password}
                      onChange={this.handleChange} placeholder={this.props.tr.password} />
                      <FormFeedback>{this.validation.password.error}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.validation.repassword.state}>
                      <Input state={this.validation.repassword.state} type="password" name="repassword" value={this.model.repassword}
                      onChange={this.handleChange} placeholder={this.props.tr.repassword} />
                      <FormFeedback>{this.validation.repassword.error}</FormFeedback>
                  </FormGroup>
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
