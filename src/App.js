import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import Header from './modules/header/Header';
import Home from './modules/home/Home';
import ShowFeeds from './modules/feeds/Show-feeds';
import FeedDetail from './modules/feeds/Feed-detail';
import { Login, Profile, Register } from './modules/user/index';

import { Loader } from './modules/shared/index';

export default class App extends Component {
    
    render () {
        
        return (
            <div>
                <Loader />
                <Router history={hashHistory}>
                    <Route path="/" component={Header}>
                        <IndexRoute component={Home} />
                        <Route path="/:lang/home" component={Home} />
                        <Route path="/:lang/show-feeds" component={ShowFeeds} />
                        <Route path="/:lang/feed-detail/:feed_id" component={FeedDetail} />
                        <Route path="/:lang/user/login" component={Login} />
                        <Route path="/:lang/user/login/:activation" component={Login} />
                        <Route path="/:lang/user/profile" component={Profile} />
                        <Route path="/:lang/user/register" component={Register} />
                    </Route>
                </Router>
            </div>
        );
    }
};
