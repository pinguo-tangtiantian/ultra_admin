import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import $ from 'jquery';
import common from '../js/common.js';

export default class ModifyCoupon extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            couponInfo: {}
        }
    }

    componentDidMount() {
        this.getCouponInfo(this.props.location.query.prid);
    }

    getCouponInfo(prid) {
        $.ajax({
            url: "http://photobazaar-testing-dev.camera360.com/manage/coupon/couponList",
            type: "GET",
            crossDomain: true,
            async: false,
            data: {
                page: 1,
                limit: 10
            },
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            success: function (res) {
                console.log(res)
                if (res.status == 200) {
                    let list = res.data.list;
                    let len = list.length;
                    for (let i = 0; i < len; i++) {
                        if (list[i].prid == this.props.location.query.prid) {
                            this.setState({
                                couponInfo: list[i]
                            })
                        }
                    }
                }
            }.bind(this)
        });
    }

    render() {
        if (Object.keys(this.state.couponInfo).length != 0) {
            console.log(common.formatTime(this.state.couponInfo.startTime, '-'))
            return (
                <div>
                    <p>优惠券修改</p>
                    <table>
                        <tr>
                            <th><span>*</span>有效期限</th>
                            {/* <td>{common.formatTime(this.state.couponInfo.startTime)}</td> */}
                            <td>
                                <span>{common.formatTime(this.state.couponInfo.startTime, '-')}</span>
                                <span>~</span>
                                <span>{common.formatTime(this.state.couponInfo.endTime, '-')}</span>
                            </td>
                        </tr>
                        <tr>
                            <th><span>*</span>优惠券类型</th>
                            <td>
                            
                            </td>
                        </tr>
                        <tr>
                            <th><span>*</span>场景</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th><span>*</span>描述</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th><span>*</span>优惠金额</th>
                            <td></td>
                        </tr>
                        <tr>
                            <th><span>*</span>满减限制</th>
                            <td></td>
                        </tr>
                    </table>
                </div>
            )
        } else {
            return <div></div>;
        }
    }
}