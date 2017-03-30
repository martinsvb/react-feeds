import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Header from './modules/header/Header';
import Home from './modules/home/Home';
import ShowFeeds from './modules/feeds/Show-feeds';
import FeedDetail from './modules/feeds/Feed-detail';

import { Loader } from './modules/shared/index';

class App extends Component {
    render () {
        return (
            <div>
                <Loader />
                <Router history={hashHistory}>
                    <Route path="/" component={Header}>
                        <IndexRoute component={Home} />
                        <Route path="/:lang/home" component={Home}/>
                        <Route path="/:lang/show-feeds" component={ShowFeeds}/>
                        <Route path="/:lang/feed-detail/:feed_id" component={FeedDetail}/>
                    </Route>
                </Router>
            </div>
        );
    }
};

export default App;