import React, { Component } from 'react';
import { connect } from 'react-redux';

import { delMessage } from './action';

const MessageComponent = (state, onMessageClick) => {

  return (
    <div>
      {state.message.map((m, i) => (
          <div key={i} className="col-sm-12">
            <div className={`alert alert-${m.type}`} role="alert">
            <button type="button" className="close" aria-label="Close" onClick={(i) => state.onMessageClick(i)}>
                <span aria-hidden="true">×</span>
            </button>
            {m.text}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default connect((store) => {
  return {
    message: store.messageReducer
  };
}, (dispatch) => {
  return {
    onMessageClick: (i) => {
      dispatch(delMessage(i));
    }
  }
})(MessageComponent);
