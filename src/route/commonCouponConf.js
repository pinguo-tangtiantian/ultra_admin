import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import $ from 'jquery';
import common from '../js/common.js';

import Table from '../components/common/table/table.js';


//table配置

export default class CommonCouponConf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                align: 'left',
                title: '通用优惠券配置',
                head: [
                    { title: '内容', key: 'desc', type: 'string' },
                    { title: '类型', key: 'type', type: 'string' },
                    { title: '优惠金额/折扣', key: 'amount', type: 'string' },
                    { title: '状态', key: 'status', type: 'string' },
                    { title: '满减限制', key: 'stint', type: 'string' },
                    { title: '开始时间', key: 'startTime', type: 'string' },
                    { title: '结束时间', key: 'endTime', type: 'string' },
                    { title: '场景', key: 'scene', type: 'string' },
                    {
                        title: '操作', type: 'operate', actions: [
                            {
                                name: '修改', onClick: function () {
                                    
                                }
                            }
                        ]
                    }
                ],
                actions: [
                    {
                        title: "修改",
                        callback: function () {
                            // doModify();
                        },
                        render: function (rowData) {

                        }
                    },
                    {
                        title: "添加优惠券",
                        callback: function () {
                            // doAddCoupon();
                        },
                        render: function (rowData) {

                        }
                    },
                    {
                        title: "上一页",
                        callback: function () {
                            // doPrevPage();
                        },
                        render: function (rowData) {

                        }
                    },
                    {
                        title: "下一页",
                        callback: function () {
                            // doNextPage();
                        },
                        render: function (rowData) {

                        }
                    }
                ],
                columns: []
            }
        }
    }


    componentDidMount() {
        let _this = this;
        _this.getCouponList();
    }

    //处理数据
    handleList(list) {
        let rules = {
            type: {
                "1": "折扣券",
                "2": "优惠券"
            },
            status: {
                "1": "可用"
            },
            scene: {
                "0": "所有场景"
            }
        };
        let len = list.length;
        let columns = [];
        for (let i = 0; i < len; i++) {
            var obj = {};
            obj.desc = list[i].desc;
            obj.type = rules.type[list[i].type];
            obj.amount = list[i].amount;
            obj.status = rules.status[list[i].status];
            obj.stint = list[i].stint == "0" ? "无限制" : "满" + list[i].stint + "元可用";
            obj.startTime = common.formatTime(list[i].startTime);
            obj.endTime = common.formatTime(list[i].endTime);
            obj.scene = rules.scene[list[i].scene];
            obj.prid = list[i].prid;
            columns.push(obj);
        }
        return columns;
    }

    getCouponList() {
        let _this = this;
        // setTimeout(function () {
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
                var newOptions = _this.state.options;
                console.log(res.data.list)
                var list = _this.handleList(res.data.list)
                newOptions.columns = list;

                _this.setState({
                    options: newOptions
                });
            }
        });
        // }, 1000)

    }



    render() {
        return (
            <Table options={this.state.options} />
        )
    }
}