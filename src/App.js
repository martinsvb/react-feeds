import React, { Component } from 'react';
import { Router, Route, hashHistory } from 'react-router';

import Header from './Header';
import AddFeed from './Add-feed';
import ShowFeeds from './Show-feeds';

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