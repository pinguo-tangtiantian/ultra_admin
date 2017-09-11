import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import $ from 'jquery';

import Table from '../components/common/table/table.js';
var Common = require('../js/common.js');


//table配置

export default class CommonCouponConf extends Component {
    //切换页码
    hangleChangePage = (event) => {
        let type = event.target.getAttribute('data-type');
        let page = this.state.options.page;
        if(type == 'prev' && page > 1){ //前一页
            page --;
        }else if(type == 'next'){
            page ++;
        }
        this.setState((prevState) => {
            Object.assign(prevState.options, { page: page});
        });
        this.getCouponList(page);
    }

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
                page: 1,
                pageAll: 0,
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
        _this.getCouponList(_this.state.options.page);
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
            obj.startTime = Common.formatTime(list[i].startTime);
            obj.endTime = Common.formatTime(list[i].endTime);
            obj.scene = rules.scene[list[i].scene];
            obj.prid = list[i].prid;
            columns.push(obj);
        }
        return columns;
    }

    getCouponList(page) {
        let _this = this;
        Common.getJSON('/manage/coupon/couponList', {
            page: page,
            limit: 10
        }, function (res) {
            if(res.status == 200){
                let newOptions = _this.state.options;
                let list = _this.handleList(res.data.list);
                let count = res.data.count;
                let all = Math.ceil(count / 10);
                newOptions.columns = list;
                _this.setState((prevState)=>{
                    Object.assign(prevState.options, {pageAll: all});
                    Object.assign(prevState, newOptions);
                });
                console.log(_this.state.options)

            }
        });

    }



    render() {
        const page = this.state.options.page;
        const pageAll = this.state.options.pageAll;
        return (
            <div>
                <Table options={this.state.options} />
                <div className="page-btns">
                    <button onClick={this.hangleChangePage} data-type="prev">上一页</button>
                    <span>{page} / {pageAll}</span>
                    <button onClick={this.hangleChangePage} data-type="next">下一页</button>
                </div>
            </div>
        )
    }
}