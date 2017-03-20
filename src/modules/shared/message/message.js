import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setMessage } from './action';
import store from '../../../redux/store';

const MessageComponent = (state) => {
  
  let message = null;
  if (state.message.text) {
    message = (
      <div className="col-sm-12">
          <div className={`alert alert-${state.message.type}`} role="alert">
          <button type="button" className="close" aria-label="Close" onClick={() => store.dispatch(setMessage({text: null, type: null}))}>
              <span aria-hidden="true">×</span>
          </button>
          {state.message.text}
          </div>
      </div>
    )
  }

  return message;
}

const mapStateToProps = (store) => {
  return {
    message: store.messageReducer
  };
};

const Message = connect(mapStateToProps)(MessageComponent);

export default Message;