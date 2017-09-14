import React, { Component } from 'react';

import Menu from './components/common/menu/menu-list.js';
export default class App extends Component {
    render() {
        return (
            <div className="page">
                <div className="menu-box">
                    <Menu />
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}