import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../redux/store';

const LoaderComponent = (state) => {
  
  let loader = null;
  if (state.loading) {
    loader = (
      <div className="fullHeight">
        <div className="col-sm-12 fullHeight align-middle text-center">
            <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return loader;
}

export default connect((store) => {
  return {
    loading: store.loaderReducer
  };
})(LoaderComponent);
