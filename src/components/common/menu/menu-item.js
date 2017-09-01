import React, { Component } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';

export default class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="menu-item"><Link to={this.props.route}> {this.props.name}</Link></li>
        )
    }
}