import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';


export default class Tbody extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let _this = this;
        return (
            <tbody>
                {
                    _this.props.options.columns.map((row) => {
                        return <tr>
                            {
                                _this.props.options.head.map((th)=>{
                                    if(th.type == 'string'){
                                        return <td>{row[th.key]}</td>
                                    }else{
                                        return (
                                            <td>
                                                <Link to={'/modifyCoupon?prid='+row.prid} >{th.actions[0].name}</Link>
                                            </td>
                                        )
                                    }
                                })
                            }
                            </tr>
                    })
                }
            </tbody>
        )
    }
}