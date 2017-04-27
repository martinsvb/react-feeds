import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup, Input, FormFeedback } from 'reactstrap';

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
    },
    setUser: (user) => {
        dispatch(setUser(user));
    }
  }
})
export class Login extends Component {

    constructor(props) {
        super(props);

        this.initModel();
        this.initValidation();

        this.validator = new Validator(this.props.params.lang, this.valRules, this.model);

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
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

        this.valRules = {
            email: ['required', 'emailSimple'],
            password: ['required', 'minLength:5']
        };
    }

    componentDidMount() {

        if (this.props.params.activation) {
            this.props.showLoader(true);

            rxHttp.get(`${hostApi}/activation/code/${this.props.params.activation}`).subscribe(
                (response) => {
                    this.props.showLoader(false);
                    this.props.addMessage({
                        type: response.info === 1 ? "success" : "danger",
                        text: response.info === 1 ? this.props.tr.userTr.userActivated : this.props.tr.userTr.userNotActivated
                    });
                },
                (error) => {
                    loggerErr("Login, login", error);
                    this.props.showLoader(false);
                    this.props.addMessage({type: "danger", text: this.props.tr.userNotLogged});
                }
            );
        }
    }

    login(event) {
      event.preventDefault();
      
      this.props.showLoader(true);
      
      rxHttp.post(`${hostApi}/login`, this.model).subscribe(
          (data) => {
            this.props.showLoader(false);
            let message = responseHandler(data, this.props.tr.userTr, {0: 'userNotLogged', 1: ''}, {'userNotExists': this.model.email});
            if (message.text) {
                this.props.addMessage(message);
            }
            if (data.info === 1) {
                if (data.user.avatar) data.user.avatar = JSON.parse(data.user.avatar);
                cache.set('token', data.token);
                cache.set('user', data.user);
                this.props.setUser(data.user);
                hashHistory.push(`/${this.props.params.lang}/home`);
            }
          },
          (error) => {
              loggerErr("Login, login", error);
              this.props.showLoader(false);
              this.props.addMessage({type: "danger", text: this.props.tr.userTr.userNotLogged});
          }
      );
    }

    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.model[name] = value;

      this.validation.valid = this.validator.formValid();

      this.forceUpdate();
    }

    handleBlur(event) {
      const name = event.target.name;

      if (Object.keys(this.valRules).includes(name)) {
        let valMessage = this.validator.itemValid(name);

        this.validation[name] = {
            state: valMessage ? 'danger' : 'success',
            error: valMessage ? valMessage : ''
            };

        this.forceUpdate();
      }
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
                      <Link className="ownButton" to={`/${this.props.params.lang}/user/register`}>{this.props.tr.register}</Link>
                    </Col>
                  </Row>
              </form>
          </div>
        )
    }
}
