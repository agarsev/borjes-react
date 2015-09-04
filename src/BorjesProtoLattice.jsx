"use strict";

import React from 'react';
import Bjs from 'borjes';

class BorjesProtoLattice extends React.Component {

    update (el, sub) {
        var x = this.props.x;
        if (sub !== null && Object.keys(sub).length == 0) {
            sub = null;
        }
        x[el] = sub;
        this.props.update(x);
    }

    addEl () {
        var el = React.findDOMNode(this.refs.newEl).value;
        var x = this.props.x;
        if (el.length > 0 && x[el] === undefined) {
            x[el] = null;
            this.props.update(x);
        }
    }

    remEl (el) {
        var x = this.props.x;
        delete x[el];
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        var contStyle = {
            display: 'flex',
            flexDirection: 'column'
        };
        var rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        };

        if (!opts.child) {
            opts.child = true;
            opts.refs = {};
            return <span style={rowStyle}>
                ⊤—<BorjesProtoLattice x={x} opts={opts} update={this.props.update} />
            </span>;
        }

        var i=0;
        return <span style={contStyle} className="borjes borjes_latticeproto" >
            {Object.keys(x).map((k) => {
                var first = !opts.refs[k];
                opts.refs[k] = true;
                var after = first && (opts.editable || x[k] !== null);
                return <span key={k+(i++)} style={rowStyle}>
                    {opts.editable?<button className="small" onClick={this.remEl.bind(this, k)}>x</button>:null}
                    <span className={first?"borjes_lpel_first":"borjes_lpel_ref"}>{k}</span>
                    {after?'—':null}
                    {after?<BorjesProtoLattice x={x[k] || {}} opts={opts} update={this.update.bind(this, k)} />:null}
                </span>;
            })}
            {opts.editable?<span><input ref="newEl" type="text" /><button onClick={this.addEl.bind(this)}>+</button></span>:null}
        </span>;
    }

}

export default BorjesProtoLattice;
