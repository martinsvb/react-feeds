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
export class Login extends Component {
  
    constructor(props) {
        super(props);

        this.initModel();
        this.initValidation();

        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    initModel() {
        this.model = {
          'email': '',
          'password': ''
        };
    }

    initValidation() {
        this.validation = {
          'email': {state: '', error: ''},
          'password': {state: '', error: ''},
          'valid': false
        };
    }

    componentDidMount() {

        if (this.props.params.activation) {
            this.props.showLoader(true);
            
            rxHttp.get(`${hostApi}/user/activation/${this.props.params.activation}`).subscribe(
                (response) => {
                    let type = response.info === 1 ? "success" : "danger";
                    let text = response.info === 1 ? this.props.tr.userActivated : this.props.tr.userNotActivated;
                    this.props.showLoader(false);
                    this.props.addMessage({type, text});
                },
                (error) => {
                    loggerErr("Login, login", error);
                    this.props.showLoader(false);
                    this.props.addMessage({
                        type: "danger",
                        text: this.props.tr.userNotLogged
                    });
                }
            );
        }
    }

    login(event) {
      event.preventDefault();
      
      this.props.showLoader(true);
      
      rxHttp.post(`${hostApi}/login`, [this.model]).subscribe(
          (response) => {
              let type = '';
              let text = '';
              this.props.showLoader(false);
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

              this.props.addMessage({type, text});
          },
          (error) => {
              loggerErr("Login, login", error);
              this.props.showLoader(false);
              this.props.addMessage({
                  type: "danger",
                  text: this.props.tr.userNotLogged
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
      this.validation[name] = {
          state: valMessage ? 'danger' : 'success',
          error: valMessage ? valMessage : ''
        };

      this.forceUpdate();
    }

    render() {

        return (
          <div className="container">    
              <h1>{this.props.tr.login}</h1>
              <form onSubmit={this.login}>
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
