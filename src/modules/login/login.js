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

        this.state = {
          'email': '',
          'emailState': '',
          'emailError': '',
          'password': '',
          'passwordState': '',
          'passwordError': ''
        };

      this.handleChange = this.handleChange.bind(this);
      this.login = this.login.bind(this);
    }

    login(event) {
      event.preventDefault();
      
      store.dispatch(showLoader(true));
      
      let data = [{
          "email": this.state.email,
          "password": this.state.password
      }]
      rxHttp.post(`${hostApi}/login`, data).subscribe(
          (response) => {
              let type = '';
              let text = '';
              store.dispatch(showLoader(false));
              if (response.hasOwnProperty("loginWarning")) {
                type = "danger";
                text = response.loginWarning === "userNotExists"
                    ? this.props.tr.userNotExists(this.state.email)
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
      
      let rules = {
          email: {
              required: [value],
              emailSimple: [value]
          },
          password: {
              required: [value],
              minLength: [5, value]
          }
      };
      
      let validator = new Validator(rules[name], this.props.lang);
      let valMessage = validator.validate();

      this.setState({
          [name]: value,
          [`${name}State`]: valMessage ? 'danger' : 'success',
          [`${name}Error`]: valMessage ? valMessage : ''
      });
    }

    render() {

        return (
          <div className="container">    
              <h1>{this.props.tr.login}</h1>
              <form onSubmit={this.login}>
                  <FormGroup color={this.state.emailState}>
                      <Input state={this.state.emailState} type="text" name="email" value={this.state.email}
                      onChange={this.handleChange} placeholder={this.props.tr.email} />
                      <FormFeedback>{this.state.emailError}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.state.passwordState}>
                      <Input state={this.state.passwordState} type="password" name="password" value={this.state.password}
                      onChange={this.handleChange} placeholder={this.props.tr.password} />
                      <FormFeedback>{this.state.passwordError}</FormFeedback>
                  </FormGroup>
                  <Row>
                    <Col xs="12" md="6">
                      <Button color="success" className="ownButton" title={this.props.tr.submit}>{this.props.tr.submit}</Button>
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
