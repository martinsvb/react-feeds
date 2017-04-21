import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup, Input, FormFeedback } from 'reactstrap';

import {
    hostApi, hostUpload, rxHttp,
    showLoader,
    addMessage,
    Validator,
    loggerErr,
    responseHandler,
    Uploader
}
from '../shared/index';

@connect((store) => {
  return {
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

        this.validator = new Validator(this.props.params.lang, this.valRules, this.model);

        this.uploadFolder = 'avatars';

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleUploadChange = this.handleUploadChange.bind(this);
        this.register = this.register.bind(this);
        this.initModel = this.initModel.bind(this);
        this.initValidation = this.initValidation.bind(this);
    }

    initModel() {
        this.model = {
          'firstName': '',
          'lastName': '',
          'avatar': '',
          'email': '',
          'password': '',
          'repassword': ''
        };
    }

    initValidation() {
        this.validation = {
          'firstName': {state: '', error: ''},
          'lastName': {state: '', error: ''},
          'email': {state: '', error: ''},
          'password': {state: '', error: ''},
          'repassword': {state: '', error: ''},
          'valid': false
        };

        this.valRules = {
            firstName: ['required', 'minLength:3'],
            lastName: ['required', 'minLength:3'],
            email: ['required', 'emailSimple'],
            password: ['required', 'minLength:5'],
            repassword: ['required', 'minLength:5', `pair:${this.props.tr.password},password`]
        };
    }

    register(event) {
      event.preventDefault();
      
      this.props.showLoader(true);
      rxHttp.post(`${hostApi}/register/lang/${this.props.params.lang}`, [this.model]).subscribe(
          (data) => {
                this.props.showLoader(false);
                let message = responseHandler(data, this.props.tr.userTr, {0: 'userRegistrationError', 1: 'userRegistered'});
                if (message.text) {
                    this.props.addMessage(message);
                }
                if (data.info === 1) {
                    this.initModel();
                    this.initValidation();
                    this.forceUpdate();
                }
          },
          (error) => {
              loggerErr("Register, register", error);
              this.props.showLoader(false);
              this.props.addMessage({type: "danger", text: this.props.tr.userTr.userRegistrationError});
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

    handleChange(event) {
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

    handleUploadChange(uploaded) {
        this.model.avatar = uploaded ? uploaded[0] : {};
    }

    render() {

        return (
          <div className="container">    
              <h1>{this.props.tr.register}</h1>
              <form onSubmit={this.register}>
                    <Uploader file={this.model.avatar}
                        type="image"
                        single
                        upload={{host: hostUpload, folder: this.uploadFolder}}
                        tr={{label: this.props.tr.uploader.uploadPic, uploader: this.props.tr.uploader}}
                        uploadChange={this.handleUploadChange}
                    />
                  <Row>
                  <Col xs="12" md="6">
                  <FormGroup color={this.validation.firstName.state}>
                      <Input state={this.validation.firstName.state} type="text" name="firstName" value={this.model.firstName}
                      onChange={this.handleChange} onBlur={this.handleBlur} placeholder={this.props.tr.firstName} />
                      <FormFeedback>{this.validation.firstName.error}</FormFeedback>
                  </FormGroup>
                  </Col>
                  <Col xs="12" md="6">
                  <FormGroup color={this.validation.lastName.state}>
                      <Input state={this.validation.lastName.state} type="text" name="lastName" value={this.model.lastName}
                      onChange={this.handleChange} onBlur={this.handleBlur} placeholder={this.props.tr.lastName} />
                      <FormFeedback>{this.validation.lastName.error}</FormFeedback>
                  </FormGroup>
                  </Col>
                  </Row>
                  <FormGroup color={this.validation.email.state}>
                      <Input state={this.validation.email.state} type="text" name="email" value={this.model.email}
                      onChange={this.handleChange} onBlur={this.handleBlur} placeholder={this.props.tr.email} />
                      <FormFeedback>{this.validation.email.error}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.validation.password.state}>
                      <Input state={this.validation.password.state} type="password" name="password" value={this.model.password}
                      onChange={this.handleChange} onBlur={this.handleBlur} placeholder={this.props.tr.password} />
                      <FormFeedback>{this.validation.password.error}</FormFeedback>
                  </FormGroup>
                  <FormGroup color={this.validation.repassword.state}>
                      <Input state={this.validation.repassword.state} type="password" name="repassword" value={this.model.repassword}
                      onChange={this.handleChange} onBlur={this.handleBlur} placeholder={this.props.tr.repassword} />
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
