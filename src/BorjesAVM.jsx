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
        var showF = {};
        var x = this.props.x;
        x.f.forEach(f => showF[f] = !(this.props.opts.hide_more && (f === 'head_dtr' || f === 'nonh_dtr')));
        this.state = { show, showF };
    }

    toggle (e) {
        this.setState({ show: !this.state.show });
        e.stopPropagation();
    }

    toggleF (f, e) {
        var showF = this.state.showF;
        showF[f] = !showF[f];
        this.setState({ showF });
        e.stopPropagation();
    }

    updateF (feat, value) {
        var x = this.props.x;
        FStruct.set(x, feat, value);
        this.props.update(x);
    }

    addF () {
        var f = this.newF.value;
        if (f.length > 0) {
            var x = this.props.x;
            FStruct.set(x, f, Anything);
            var s = this.state;
            s.showF[f] = true;
            this.setState(s);
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
        var refresh = this.props.refresh;
        if (x.borjes === 'tfstruct' && !opts.editable && atrs.length==0) {
            return <span className="borjes_typerestr">{x.type.e}</span>
        }
        return (<table className="borjes_fs">
            {(x.borjes === 'tfstruct' || opts.editable)?<thead><tr>
                <th colSpan="2" onClick={opts.editable?null:this.toggle.bind(this)}>
                    <BorjesComponent x={x.type || Anything} refresh={refresh} update={this.updateType.bind(this)} opts={opts} />
                </th></tr></thead>:null}
            <tbody className={this.state.show?'borjes_visible':'borjes_hidden'} >
            {atrs.map(f => {
                var val = FStruct.get(x, f);
                var fname = f;
                if (!opts.editable) {
                    while (val.borjes === 'fstruct' && val.f.length == 1) {
                        fname += ' | '+val.f[0];
                        val = FStruct.get(val, val.f[0]);
                    }
                }
                return (<tr key={f}>
                    <td className="borjes_feat">
                        {opts.editable?<button className="small"
                            onClick={this.rmF.bind(this, f)}>x</button>:null}
                        <span onClick={this.toggleF.bind(this, f)}>{fname}</span></td>
                    <td>{this.state.showF[f]?<BorjesComponent update={this.updateF.bind(this, f)} refresh={refresh} x={val} opts={opts}/>:null}</td>
                </tr>);
            })}
            {opts.editable?<tr><td><input ref={d=>this.newF=d} type="text" /><button onClick={this.addF.bind(this)}>+</button></td></tr>:null}
            </tbody>
        </table>);
    }

    componentDidUpdate () {
        var refresh = this.props.refresh;
        if (refresh) { refresh(); }
    }

}

export default BorjesAVM;
