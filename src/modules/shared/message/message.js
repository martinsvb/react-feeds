import React, { Component } from 'react';
import { connect } from 'react-redux';

import { delMessage } from './action';

@connect((store) => {
  return {
    message: store.messageReducer
  };
}, (dispatch) => {
  return {
    onMessageClick: (i) => {
      dispatch(delMessage(i));
    }
  }
})
export class Message extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div>
        {this.props.message.map((m, i) => (
            <div key={i} className="col-sm-12">
              <div className={`alert alert-${m.type}`} role="alert">
              <button type="button" className="close" aria-label="Close" onClick={(i) => this.props.onMessageClick(i)}>
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
}
