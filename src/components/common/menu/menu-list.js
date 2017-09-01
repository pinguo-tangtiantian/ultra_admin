import React, { Component } from 'react';
import { Router, Route, browserHistory, Link } from 'react-router';
import Item from './menu-item.js';


export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: [
                { name: '订单列表', route: "" },
                { name: '摄影师列表', route: "" },
                { name: '参数配置', route: "" },
                { name: '样片列表', route: "" },
                { name: '统计报表', route: "" },
                { name: '月统计表', route: "" },
                { name: '专题管理', route: "" },
                { name: '通用优惠券配置', route: "/common_coupon_conf" },
                { name: '制定用户优惠券配置', route: "" },
                { name: '企业配置', route: "" },
                { name: '活动配置', route: "" },
                { name: '制图方式管理', route: "" }
            ]

        }
    }

    render() {
        return (
            <ul role="nav" className="menu">
                {
                    this.state.menu.map((item) => {
                        return <Item name={item.name} route={item.route} />
                    })
                }
            </ul>
        )
    }
}