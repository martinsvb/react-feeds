import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect((store) => {
  return {
    loading: store.loaderReducer
  };
})
export class Loader extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return this.props.loading && (
      <div className="loader">
        <div className="loader-content">
            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
