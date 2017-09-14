import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Tbody extends Component {
    componentDidMount() {
    }

    render() {
        let options = this.props.options;
        return (
            <tbody>
                {
                    options.columns.map((row) => {
                        return <tr>
                            {
                                options.head.map((th)=>{
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