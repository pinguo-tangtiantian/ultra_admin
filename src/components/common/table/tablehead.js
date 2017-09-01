import React, { Component } from 'react';


export default class Thead extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <thead>
                <tr>
                    {
                        this.props.ths.map((head) => {
                            return (
                                <th key={head.key}>{head.title}</th>
                            )
                        })
                    }
                </tr>
            </thead>
        )
    }
}