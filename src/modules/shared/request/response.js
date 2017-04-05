import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    showLoader,
    addMessage
}
from '../index';

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
export class Response extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let data = this.props.data;
        let type = '';
        let text = '';
        
        if (data.hasOwnProperty("warning")) {
            type = "danger";
            text = this.props.tr[data.warning];
        }

        if (data.hasOwnProperty("info")) {
            type = data.info ? "success" : "danger";
            text = this.props.tr[this.props.info[data.info]];
        }

        this.props.showLoader(false);
        this.props.addMessage({type, text});
    }
}
