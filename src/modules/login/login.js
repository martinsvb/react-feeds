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
})
export class Login extends Component {
  
    constructor(props) {
        super(props);

        this.model = {
          'email': '',
          'password': ''
        };

        this.validation = {
          'emailState': '',
          'emailError': '',
          'passwordState': '',
          'passwordError': '',
          'valid': false
        };

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    login(event) {
      event.preventDefault();
      
      store.dispatch(showLoader(true));
      
      let data = [this.model];
      rxHttp.post(`${hostApi}/login`, data).subscribe(
          (response) => {
              let type = '';
              let text = '';
              store.dispatch(showLoader(false));
              if (response.hasOwnProperty("loginWarning")) {
                type = "danger";
                text = response.loginWarning === "userNotExists"
                    ? this.props.tr.userNotExists(this.model.email)
                    : this.props.tr[response.loginWarning];
              }

              if (response.hasOwnProperty("loginInfo")) {
                if (response.loginInfo === 1) {
                  this.user = response;
                  console.log(this.user);
                }

                if (response.loginInfo === 0) {
                      type = "danger";
                      text = this.props.tr.userNotLogged;
                }
              }

              store.dispatch(addMessage({type, text}));
          },
          (error) => {
              loggerErr("Login, login", error);
              store.dispatch(showLoader(false));
              store.dispatch(addMessage({
                  type: "danger",
                  text: this.props.tr.userNotLogged
              }));
          }
      );
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.model[name] = value;

      let rules = {
          email: {
              required: [this.model.email],
              emailSimple: [this.model.email]
          },
          password: {
              required: [this.model.password],
              minLength: [5, this.model.password]
          }
      };

      let validator = new Validator(this.props.lang);
      let valMessage = validator.validate(rules[name]);

      this.validation.valid = validator.formValid(rules);
      this.validation[`${name}State`] = valMessage ? 'danger' : 'success';
      this.validation[`${name}Error`] = valMessage ? valMessage : '';

      this.forceUpdate();
    }

    render() {

        return (
          <div className="container">    
              <h1>{this.props.tr.login}</h1>
              <form onSubmit={this.login}>
                  <FormGroup color={this.validation.emailState}>
                      <Input state={this.validation.emailState} type="text" name="email" value={this.model.email}
                      onChange={this.handleChange} placeholder={this.props.tr.email} />
                      <FormFeedback>{this.validation.emailError}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.validation.passwordState}>
                      <Input state={this.validation.passwordState} type="password" name="password" value={this.model.password}
                      onChange={this.handleChange} placeholder={this.props.tr.password} />
                      <FormFeedback>{this.validation.passwordError}</FormFeedback>
                  </FormGroup>
                  <Row>
                    <Col xs="12" md="6">
                      <Button color="success" className="ownButton" disabled={!this.validation.valid} title={this.props.tr.submit}>{this.props.tr.submit}</Button>
                    </Col>
                    <Col xs="12" md="6">
                      <Link className="ownButton" to={`/${this.props.lang}/register`}>{this.props.tr.register}</Link>
                    </Col>
                  </Row>
              </form>
          </div>
        )
    }
}
