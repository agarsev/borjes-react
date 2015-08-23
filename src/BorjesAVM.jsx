"use strict";

import React from 'react';
import Bjs from 'borjes';

import BorjesComponent from './BorjesComponent';

var FStruct = Bjs.types.FStruct;
var Anything = Bjs.types.Anything;

class BorjesAVM extends React.Component {

    constructor (props) {
        super(props);
        var show = this.props.opts.show;
        if (show === undefined) { show = true; }
        this.state = { show };
    }

    toggle (e) {
        this.setState({ show: !this.state.show });
        e.stopPropagation();
    }

    updateF (feat, value) {
        var x = this.props.x;
        FStruct.set(x, feat, value);
        this.props.update(x);
    }

    addF () {
        var f = React.findDOMNode(this.refs.newF).value;
        if (f.length > 0) {
            var x = this.props.x;
            FStruct.set(x, f, Anything);
            this.props.update(x);
        }
    }

    rmF (f) {
        var x = this.props.x;
        FStruct.unset(x, f);
        this.props.update(x);
    }

    updateType (t) {
        var x = this.props.x;
        if (t !== Anything && x.borjes !== 'tfstruct') {
            x = Bjs.types.TFS(t, x.v, x.f);
        } else {
            x.type = t;
        }
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        var atrs = x.f;
        return (<table className="borjes_fs">
            {(x.borjes === 'tfstruct' || opts.editable)?<thead><tr>
                <th colSpan="2" onClick={opts.editable?null:this.toggle.bind(this)}>
                    <BorjesComponent x={x.type || Anything} update={this.updateType.bind(this)} opts={opts} />
                </th></tr></thead>:null}
            <tbody className={this.state.show?'borjes_visible':'borjes_hidden'} >
            {atrs.map(f => {
                return (<tr key={f}>
                    <td className="borjes_feat">
                        {opts.editable?<button onClick={this.rmF.bind(this, f)}>x</button>:null}
                        {f}</td>
                    <td><BorjesComponent update={this.updateF.bind(this, f)} x={FStruct.get(x, f)} opts={opts}/></td>
                </tr>);
            })}
            {opts.editable?<td><input ref="newF" type="text" /><button onClick={this.addF.bind(this)}>+</button></td>:null}
            </tbody>
        </table>);
    }

}

export default BorjesAVM;
