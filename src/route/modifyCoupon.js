import React, { Component } from 'react';
import 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import $ from 'jquery';

var Common = require('../js/common.js');


export default class ModifyCoupon extends Component {

    //处理表单事件
    handleFormEvent = (event) => {
        let key = event.target.getAttribute("data-key");    //获取事件类型
        let newValue = event.target.value;
        this.setState((prevState) => {
            prevState.couponInfo[key] = newValue;
        });
    }

    //保存修改
    handleSave = (event) => {
        let _this = this;
        $.ajax({
            url: "http://photobazaar-testing-dev.camera360.com/manage/coupon/couponUpdate",
            type: 'POST',
            data: _this.state.couponInfo,
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            success: function (res) {
                if (res.status === 200) {

                } else if (res.status === 403) {
                    alert(res.message);
                }
            }
        })
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
        let _this = this;
        Common.getJSON('/manage/coupon/couponList', {
            page: 1,
            limit: 10
        }, function (res) {
            if (res.status === 200) {
                let list = res.data.list;
                let len = list.length;
                for (let i = 0; i < len; i++) {
                    if (list[i].prid == _this.props.location.query.prid) {
                        _this.setState((prevState) => {
                            Object.assign(prevState, { couponInfo: list[i] });
                            Object.assign(prevState.dateTime,
                                { startTime: Common.formatTime(list[i].startTime) },
                                { endTime: Common.formatTime(list[i].endTime) },
                            );
                        })
                    }
                }
            }
        })
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
                                    <select className="form-control" defaultValue={couponInfo.type} data-key='type' onChange={this.handleFormEvent}>
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
                                    <select className="form-control" defaultValue={couponInfo.scene} data-key='scene' onChange={this.handleFormEvent}>
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
                            <td><input className="form-control" defaultValue={couponInfo.desc} data-key='desc' onBlur={this.handleFormEvent} /></td>
                        </tr>
                        <tr>
                            <th><span>*</span>优惠金额</th>
                            <td><input className="form-control" defaultValue={couponInfo.amount} data-key='amount' onBlur={this.handleFormEvent} /></td>
                        </tr>
                        <tr>
                            <th><span>*</span>满减限制</th>
                            <td><input className="form-control" defaultValue={couponInfo.stint}
                                data-key='stint' onBlur={this.handleFormEvent} /></td>
                        </tr>
                    </table>
                    <div><button onClick={this.handleSave}>修改</button></div>
                </div>
            )
        } else {
            return <div></div>;
        }
    }
}