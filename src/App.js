import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Header from './modules/header/Header';
import Home from './modules/home/Home';
import ShowFeeds from './modules/feeds/Show-feeds';
import FeedDetail from './modules/feeds/Feed-detail';

class App extends Component {
    render () {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Header}>
                    <IndexRoute component={Home} />
                    <Route path="/home" component={Home}/>
                    <Route path="/show-feeds" component={ShowFeeds}/>
                    <Route path="/feed-detail/:feed_id" component={FeedDetail}/>
                </Route>
            </Router>
        );
    }
};

export default App;