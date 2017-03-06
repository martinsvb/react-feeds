import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Header from './modules/header/Header';
import AddFeed from './modules/add-feed/Add-feed';
import ShowFeeds from './modules/show-feeds/Show-feeds';

class App extends Component {
    render () {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Header}>
                    <Route path="/add-feed" component={AddFeed}/>
                    <Route path="/show-feeds" component={ShowFeeds}/>
                </Route>
            </Router>
        );
    }
};

export default App;