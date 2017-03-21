import React, { Component } from 'react';
import { Alert } from 'reactstrap';
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
      <div className="row">
        {this.props.message.map((m, i) => (
            <div key={i} className="col-sm-12">
              <Alert color={m.type} toggle={(i) => this.props.onMessageClick(i)}>
                {m.text}
              </Alert>
            </div>
          )
        )}
      </div>
    );
  }
}
