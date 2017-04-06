import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
    Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
}
from 'reactstrap';

import {
    Message,
    setTrans, getLang, getTranslation
}
from '../shared/index';

import { setUser } from '../user/index';

@connect((store) => {
  return {
    tr: store.transReducer,
    user: store.userReducer
  };
}, (dispatch) => {
  return {
    setTrans: (tr) => {
        dispatch(setTrans(tr));
    },
    setUser: (user) => {
        dispatch(setUser(user));
    }
  }
})
class Header extends Component {
    
    constructor(props) {
        super(props);

        this.lang = getLang(this.props.params.lang);
        this.props.setTrans(getTranslation(this.lang));

        this.logout();

        this.toggle = this.toggle.bind(this);
        this.state = {
            langDropDown: false,
            userDropDown: false
        };
    }

    toggle(dropDown) {
        this.setState({
            [dropDown]: !this.state[dropDown]
        });
    }

    translation(lang) {
        this.lang = lang;
        this.props.setTrans(getTranslation(this.lang));
        let location = this.props.location.pathname
        if (location.length > 1) {
            location = location.replace(/^\/[a-z]{2}/g, `/${lang}`);
            browserHistory.push(location);
        }
    }

    logout() {
        this.props.setUser({});
    }

    render() {

        return (
            <div>
                <header className="container-fluid">
                    <Row>
                        <Col md="12">
                            <nav className="app-nav">
                                <Link to={`/${this.lang}/home`} className="app-nav-link" activeClassName="active-link" title={this.props.tr.home}>
                                    <i className="fa fa-home app-nav-link-ico" aria-hidden="true"></i><span className="app-nav-link-text">{this.props.tr.home}</span>
                                </Link>
                                <Link to={`/${this.lang}/show-feeds`} className="app-nav-link" activeClassName="active-link" title="Show feeds">
                                    <i className="fa fa-file-text app-nav-link-ico" aria-hidden="true"></i><span className="app-nav-link-text">Show feeds</span>
                                </Link>
                            </nav>
                            
                            <div className="right-box">
                                <Dropdown className="user-nav" isOpen={this.state.userDropDown} toggle={() => this.toggle('userDropDown')}>
                                    <DropdownToggle className="noBorder" caret>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                        <span className="user-nav-name">&nbsp;{this.props.user.name || this.props.tr.guest}</span>
                                    </DropdownToggle>
                                        {!this.props.user.name &&
                                        <DropdownMenu>
                                            <DropdownItem title={this.props.tr.login}>
                                                <Link to={`/${this.lang}/user/login`}>{this.props.tr.login}</Link>
                                            </DropdownItem>
                                            <DropdownItem title={this.props.tr.register}>
                                                <Link to={`/${this.lang}/user/register`}>{this.props.tr.register}</Link>
                                            </DropdownItem>
                                        </DropdownMenu>
                                        }
                                        {this.props.user.name &&
                                        <DropdownMenu>
                                            <DropdownItem title={this.props.tr.profile}>
                                                <Link to={`/${this.lang}/user/profile`}>{this.props.tr.profile}</Link>
                                            </DropdownItem>
                                            <DropdownItem onClick={() => this.logout()} title={this.props.tr.logout}>
                                                {this.props.tr.logout}
                                            </DropdownItem>
                                        </DropdownMenu>
                                        }
                                </Dropdown>

                                <Dropdown className="lang-nav" isOpen={this.state.langDropDown} toggle={() => this.toggle('langDropDown')}>
                                    <DropdownToggle className="noBorder" caret>
                                        <img src={`/assets/img/flags/${this.lang}.png`} className="img-rounded lang-nav-img" />
                                        <span className="lang-nav-name">&nbsp;{this.props.tr[this.lang]}</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.lang != 'en' &&
                                        <DropdownItem onClick={() => this.translation('en')} title={this.props.tr.english}>
                                            <img src='/assets/img/flags/en.png' className="img-rounded lang-nav-img" />
                                        </DropdownItem>
                                        }
                                        {this.lang != 'cz' &&
                                        <DropdownItem onClick={() => this.translation('cz')} title={this.props.tr.czech}>
                                            <img src='/assets/img/flags/cz.png' className="img-rounded lang-nav-img" />
                                        </DropdownItem>
                                        }
                                        {this.lang != 'sk' &&
                                        <DropdownItem onClick={() => this.translation('sk')} title={this.props.tr.slovak}>
                                            <img src='/assets/img/flags/sk.png' className="img-rounded lang-nav-img" />
                                        </DropdownItem>
                                        }
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
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