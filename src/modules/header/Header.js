import React, { Component } from 'react';
import { Link } from 'react-router';
import {
    Row, Col,
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
}
from 'reactstrap';

import {
    Message,
    setLang, setTrans, getLang, getTranslation
}
from '../shared/index';

import store from '../../redux/store';

class Header extends Component {
    
    constructor(props) {
        super(props);

        this.lang = getLang(this.props.params['lang']);
        this.transDispatch();

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    translation(lang) {
        this.lang = lang;
        this.transDispatch();
    }

    transDispatch() {
        this.tr = getTranslation(this.lang);
        store.dispatch(setLang(this.lang));
        store.dispatch(setTrans(this.tr));
    }

    render() {

        return (
            <div>
                <header className="container-fluid">
                    <Row>
                        <Col md="12">
                            <nav className="app-nav">
                                <Link to={`/${this.lang}/home`} className="app-nav-link" activeClassName="active-link" title={this.tr.home}>
                                    <i className="fa fa-home app-nav-link-ico" aria-hidden="true"></i><span className="app-nav-link-text">{this.tr.home}</span>
                                </Link>
                                <Link to={`/${this.lang}/show-feeds`} className="app-nav-link" activeClassName="active-link" title="Show feeds">
                                    <i className="fa fa-file-text app-nav-link-ico" aria-hidden="true"></i><span className="app-nav-link-text">Show feeds</span>
                                </Link>
                            </nav>
                            
                            <div className="right-box">
                                <Dropdown className="lang-nav" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle className="noBorder" caret>
                                        <img src={`/assets/img/flags/${this.lang}.png`} className="img-rounded lang-nav-img" />
                                        <span className="lang-nav-name">&nbsp;{this.tr[this.lang]}</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.lang != 'en' &&
                                        <DropdownItem onClick={() => this.translation('en')} title={this.tr.english}>
                                            <img src='/assets/img/flags/en.png' className="img-rounded lang-nav-img" />
                                        </DropdownItem>
                                        }
                                        {this.lang != 'cz' &&
                                        <DropdownItem onClick={() => this.translation('cz')} title={this.tr.czech}>
                                            <img src='/assets/img/flags/cz.png' className="img-rounded lang-nav-img" />
                                        </DropdownItem>
                                        }
                                        {this.lang != 'sk' &&
                                        <DropdownItem onClick={() => this.translation('sk')} title={this.tr.slovak}>
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