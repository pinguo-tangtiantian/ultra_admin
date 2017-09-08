import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import PropTypes from 'prop-types';
import $ from 'jquery';
import common from '../js/common.js';


export default class ModifyCoupon extends Component {
    //处理优惠券
    handleTypeChange = (event) => {

    }


    //处理场景变化
    handleSceneChange = (event) => {
        this.setState((prevState) => {
            Object.assign(prevState.couponInfo, { scene: event.target.value });
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            couponInfo: {},
            pickerConf: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm:ss',
                input: true,
                open: true,
            },
            dateTime: {
                startTime: "",
                endTime: "",
                startChange: function (moment) {
                    this.setState((prevState) => {
                        Object.assign(prevState.dateTime, { startTime: moment });
                        Object.assign(prevState.couponInfo, { startTime: '' + moment.format('x') / 1000 });
                    });
                }.bind(this),
                endChange: function (moment) {
                    this.setState((prevState) => {
                        Object.assign(prevState.dateTime, { endTime: moment });
                        Object.assign(prevState.couponInfo, { endTime: '' + moment.format('x') / 1000 });
                    })
                }.bind(this)
            },
            sceneList: []
        }
    }

    componentDidMount() {
        //获取优惠券数据
        this.getCouponInfo(this.props.location.query.prid);
        //获取场景列表
        this.getSceneList();
    }

    getCouponInfo(prid) {
        $.ajax({
            url: "http://photobazaar-testing-dev.camera360.com/manage/coupon/couponList",
            type: "GET",
            crossDomain: true,
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
                            this.setState((prevState) => {
                                Object.assign(prevState, { couponInfo: list[i] });
                                Object.assign(prevState.dateTime,
                                    { startTime: common.formatTime(list[i].startTime) },
                                    { endTime: common.formatTime(list[i].endTime) },
                                );
                            })
                        }
                    }
                }
            }.bind(this)
        });
    }

    getSceneList() {
        $.ajax({
            url: 'http://photobazaar-testing-dev.camera360.com/manage/indexConf/sceneList',
            data: {
                page: 1,
                limit: 10
            },
            crossDomain: true,
            method: "GET",
            dataType: "JSON",
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            success: function (res) {
                if (res.status == 200) {
                    this.setState({
                        sceneList: res.data.list
                    });
                }
            }.bind(this)
        })
    }

    render() {
        if (Object.keys(this.state.couponInfo).length != 0) {
            const { dateFormat, timeFormat, input, open } = this.state.pickerConf;
            const { startTime, endTime, startChange, endChange } = this.state.dateTime;
            const couponInfo = this.state.couponInfo;
            console.log(this.state.couponInfo)
            return (
                <div>
                    <p>优惠券修改</p>
                    <table className="table">
                        <tr>
                            <th><span>*</span>有效期限</th>
                            <td>
                                <Datetime
                                    value={startTime}
                                    dateFormat={dateFormat}
                                    timeFormat={timeFormat}
                                    onChange={startChange}
                                    input={input}
                                    className="inline-block"
                                />
                                <span>~</span>
                                <Datetime
                                    value={endTime}
                                    dateFormat={dateFormat}
                                    timeFormat={timeFormat}
                                    onChange={endChange}
                                    input={input}
                                    className="inline-block"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><span>*</span>优惠券类型</th>
                            <td>
                                <form>
                                    <select value={couponInfo.type} className="form-control">
                                        <option value="1">满减</option>
                                        <option value="2">折扣</option>
                                    </select>
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <th><span>*</span>场景</th>
                            <td>
                                <form>
                                    <select className="form-control" value={couponInfo.scene} onChange={this.handleSceneChange}>
                                        {
                                            this.state.sceneList.map(scene => {
                                                return <option key={scene.type} value={scene.type}>{scene.name}</option>
                                            })

                                        }
                                    </select>

                                </form>
                            </td>
                        </tr>
                        <tr>
                            <th><span>*</span>描述</th>
                            <td><input className="form-control" value={couponInfo.desc} /></td>
                        </tr>
                        <tr>
                            <th><span>*</span>优惠金额</th>
                            <td><input className="form-control" value={couponInfo.amount} /></td>
                        </tr>
                        <tr>
                            <th><span>*</span>满减限制</th>
                            <td><input className="form-control" value={couponInfo.stint == "0" ? "无限制" : "满" + couponInfo.stint + "元可用"} /></td>
                        </tr>
                    </table>
                </div>
            )
        } else {
            return <div></div>;
        }
    }
}