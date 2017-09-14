// code with ES5
import React, { Component } from 'react';

import Actions from './reflux/actions.js';
import Store from './reflux/store.js';

//引入组件
import Table from '../components/common/table/table.js';

var CommonCouponConf = React.createClass({
    getInitialState: function(){
        //设置初始state值
        var options = {
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
                    title: '操作', key: 'action', type: 'operate', actions: [
                        {
                            name: '修改', onClick: function () {
                            }
                        }
                    ]
                }
            ],
            page: 1,
            pageAll: 0,
            actions: [],
            columns: []
        };

        return options;
    },

    onChange: function(option){
        // alert("ok")
        console.log(option)
        this.setState({
            options: option
        });
    },

    componentDidMount(){
        //绑定监听：因此无论触发Actions对象中的哪一个行为，组件的onChange方法都会被调用，所以state就会被更新，页面会重新渲染
        this.unsubscribe = Store.listen(this.onChange);
        Store.getList();
    },

    componentWillUnmount(){
        //解除监听
            this.unsubscribe();
            
    },

    render: function(){
        console.log(this.state)
        return (
            <div>
                <p>现在接入reflux了</p>
                <Table options={this.state} />
                <div className="page-btns">
                    <button  data-type="prev">上一页</button>
                    <span>{this.state.page} / {this.state.pageAll}</span>
                    <button  data-type="next">下一页</button>
                </div>
            </div>
        )

    }
});

export default CommonCouponConf;


