import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <nav className="app-nav">
                        <Link to="/add-feed" className="app-nav-link" activeClassName="active-link" title="Add feed">
                        <i className="fa fa-home app-nav-link-ico" aria-hidden="true"></i><span className="app-nav-link-text">Home</span>
                        </Link>
                        <Link to="/show-feeds" className="app-nav-link" activeClassName="active-link" title="Show feeds">
                        <i className="fa fa-file-text app-nav-link-ico" aria-hidden="true"></i><span className="app-nav-link-text">Show feeds</span>
                        </Link>
                    </nav>
                </header>
                {this.props.children}
            </div>
        );
    }
};

export default Header;