import React, { Component } from 'react';

import Thead from './tablehead.js';
import Tbody from './tablebody.js';

export default class Table extends Component {
    componentDidMount() {
        
    }

    render() {
        console.log(this.props)
        if (this.props.options.columns.length > 0) {
            return (
                <table className="table">
                    <Thead ths={this.props.options.head} />
                    <Tbody options={this.props.options} />
                </table>
            )
        } else {
            return <p>数据还没到</p>
        }

    }
}