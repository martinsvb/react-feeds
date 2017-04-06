import React, { Component } from 'react';
import { connect } from 'react-redux';

import store from '../../redux/store';

import { getTranslation } from '../shared/index';

@connect((store) => {
  return {
    tr: store.transReducer,
    user: store.userReducer
  };
})
export default class Home extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>{this.props.tr.home}</h1>
                    <p>Welcome in beatiful feed application!</p>
                </div>
            </div>
        )
    }
}
