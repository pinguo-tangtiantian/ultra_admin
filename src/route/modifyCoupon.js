import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import $ from 'jquery';
import common from '../js/common.js';

export default class ModifyCoupon extends Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div>
                <p>优惠券修改</p>
                <table>
                    <tr>
                        <th><span>*</span>有效期限</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th><span>*</span></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th><span>*</span></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th><span>*</span></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th><span>*</span></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th><span>*</span></th>
                        <td></td>
                    </tr>
                    <tr>
                        <th></th>
                        <td></td>
                    </tr>
                </table>
            </div>
        )
    }
}