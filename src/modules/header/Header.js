import React, { Component } from 'react';
import { Link } from 'react-router';

import {
    Message,
    setLang, getLang, getTranslation
}
from '../shared/index';

import store from '../../redux/store';

class Header extends Component {
    
    constructor(props) {
        super(props);

        this.lang = getLang(this.props.params['lang']);
        store.dispatch(setLang(this.lang));
        this.tr = getTranslation(this.lang);
    }
    
    render() {
        return (
            <div>
                <header>
                    <nav className="app-nav">
                        <Link to={`/${this.lang}/home`} className="app-nav-link" activeClassName="active-link" title={this.tr.home}>
                        <i className="fa fa-home app-nav-link-ico" aria-hidden="true"></i><span className="app-nav-link-text">{this.tr.home}</span>
                        </Link>
                        <Link to={`/${this.lang}/show-feeds`} className="app-nav-link" activeClassName="active-link" title="Show feeds">
                        <i className="fa fa-file-text app-nav-link-ico" aria-hidden="true"></i><span className="app-nav-link-text">Show feeds</span>
                        </Link>
                    </nav>
                    
                    <div class="right-box">
                        <div class="dropdown lang-nav">
                            <a class="dropdown-toggle" title="{{ tr[lang] }}" href="#" id="langDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src='/assets/img/flags/{{lang}}.png' class="img-rounded lang-nav-img" /><span class="lang-nav-name">&nbsp;{{ tr[lang] }}</span></a>
                            <div class="dropdown-menu" aria-labelledby="langDropDown">
                            <a [hidden]="lang=='en'" (click)="translation('en')" class="dropdown-item" title="{{ tr?.english }}" href="" id="langDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src='/assets/img/flags/en.png' class="img-rounded lang-nav-img" /><span class="lang-nav-name">&nbsp;{{ tr?.english }}</span></a>
                            <a [hidden]="lang=='cz'" (click)="translation('cz')" class="dropdown-item" title="{{ tr?.czech }}" href="" id="langDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src='/assets/img/flags/cz.png' class="img-rounded lang-nav-img" /><span class="lang-nav-name">&nbsp;{{ tr?.czech }}</span></a>
                            <a [hidden]="lang=='sk'" (click)="translation('sk')" class="dropdown-item" title="{{ tr?.slovak }}" href="" id="langDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src='/assets/img/flags/sk.png' class="img-rounded lang-nav-img" /><span class="lang-nav-name">&nbsp;{{ tr?.slovak }}</span></a>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <Message />
                </div>
                {this.props.children}
            </div>
        );
    }
};

export default Header;