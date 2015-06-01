"use strict";

import React from 'react';
import Bjs from 'borjes';

import BorjesComponent from './BorjesComponent';

var FStruct = Bjs.types.FStruct;

class BorjesAVM extends React.Component {

    constructor (props) {
        super(props);
        var show = this.props.opts.show;
        if (show === undefined) { show = true; }
        this.state = { show };
    }

    toggle () {
        this.setState({ show: !this.state.show });
    }
    render () {
        var x = this.props.x;
        var atrs = x.f;
        return (<table className="borjes_fs">
            {x.borjes === 'tfstruct'?<thead><tr><th colSpan="2" onClick={this.toggle.bind(this)}>
            <BorjesComponent x={x.type} opts={this.props.opts} /></th></tr></thead>:null}
            <tbody className={this.state.show?'borjes_visible':'borjes_hidden'} >
            {atrs.map(f => {
                return (<tr key={f}>
                    <td className="borjes_feat">{f}</td>
                    <td><BorjesComponent x={FStruct.get(x, f)} opts={this.props.opts}/></td>
                </tr>);
            })}
            </tbody>
        </table>);
    }

}

export default BorjesAVM;
