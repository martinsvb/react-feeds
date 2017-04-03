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
export class Register extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
          'name': '',
          'nameState': '',
          'nameError': '',
          'email': '',
          'emailState': '',
          'emailError': '',
          'password': '',
          'passwordState': '',
          'passwordError': '',
          'repassword': '',
          'repasswordState': '',
          'repasswordError': ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }

    register(event) {
      event.preventDefault();
      
      store.dispatch(showLoader(true));
      
      let data = [{
          "email": this.state.email,
          "password": this.state.password,
          "repassword": this.state.repassword
      }];
      rxHttp.post(`${hostApi}/register`, data).subscribe(
          (response) => {
              let type = '';
              let text = '';
              store.dispatch(showLoader(false));
              if (response.hasOwnProperty("warning")) {
                  type = "danger";
                  text = this.props.tr[response.warning];
              }

              if (response.hasOwnProperty("info")) {
                if (response.info === 1) {
                  type = "success";
                  text = this.props.tr.userRegistered;

                  this.setState({
                    name: '',
                    email: '',
                    password: '',
                    repassword: ''
                  });
                }

                if (response.info === 0) {
                  type = "danger";
                  text = this.props.tr.userRegistrationError;
                }
              }

              store.dispatch(addMessage({type, text}));
          },
          (error) => {
              loggerErr("Register, register", error);
              store.dispatch(showLoader(false));
              store.dispatch(addMessage({
                  type: "danger",
                  text: this.props.tr.userRegistrationError
              }));
          }
      );
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      
      let rules = {
          name: {
              required: [value],
              minLength: [3, value]
          },
          email: {
              required: [value],
              emailSimple: [value]
          },
          password: {
              required: [value],
              minLength: [5, value]
          },
          repassword: {
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
              <h1>{this.props.tr.register}</h1>
              <form onSubmit={this.register}>
                  <FormGroup color={this.state.nameState}>
                      <Input state={this.state.nameState} type="text" name="name" value={this.state.name}
                      onChange={this.handleChange} placeholder={this.props.tr.name} />
                      <FormFeedback>{this.state.nameError}</FormFeedback>
                  </FormGroup>
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
                  <FormGroup color={this.state.repasswordState}>
                      <Input state={this.state.repasswordState} type="password" name="repassword" value={this.state.repassword}
                      onChange={this.handleChange} placeholder={this.props.tr.repassword} />
                      <FormFeedback>{this.state.repasswordError}</FormFeedback>
                  </FormGroup>
                  <Row>
                    <Col md="12">
                      <Button color="success" className="ownButton" title={this.props.tr.submit}>{this.props.tr.submit}</Button>
                    </Col>
                  </Row>
              </form>
          </div>
        )
    }
}
