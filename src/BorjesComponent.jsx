"use strict";

import React from 'react';
import Bjs from 'borjes';

var FStruct = Bjs.types.FStruct;

import BorjesTree from './BorjesTree';
import BorjesAVM from './BorjesAVM';
import BorjesVariable from './BorjesVariable';

class BorjesComponent extends React.Component {

    updateLiteral (e) {
        this.props.update(Bjs.types.Literal(e.target.value));
    }

    remove () {
        this.props.update(Bjs.types.Anything);
    }

    copy () {
        this.props.opts.cpbuffer.v = Bjs.types.copy(this.props.x);
    }

    paste () {
        var p = this.props.opts.cpbuffer.v;
        if (p !== undefined) {
            this.props.update(Bjs.types.copy(p));
        }
    }

    newV (type) {
        var o;
        switch (type) {
            case 'l':
                o = Bjs.types.Literal('');
                break;
            case 'f':
                o = Bjs.types.FStruct();
                break;
            case 'v':
                o = Bjs.types.Variable(this.props.opts.world, Bjs.types.Anything);
                break;
        }
        this.props.update(o);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts || {};
        opts.cpbuffer = this.props.cpbuffer || opts.cpbuffer || {};
        var update = this.props.update;
        if (typeof x !== 'object') {
            return <span>{x}</span>;
        }
        if (x instanceof Array) {
            return (<div>
                {x.map((y, i) => <BorjesComponent opts={opts} key={i} x={y} />)}
            </div>);
        }
        if (x.borjes_bound !== undefined && opts.world === undefined) {
            opts.world = x.borjes_bound;
        }
        var prev;
        if (opts.editable) {
            prev = <span>
                <button onClick={this.remove.bind(this)}>x</button>
                <button onClick={this.copy.bind(this)}>c</button>
            </span>;
        }
        switch (x.borjes) {
            case 'anything':
                return <span className="borjes">
                    <button onClick={this.newV.bind(this, 'l')}>l</button>
                    <button onClick={this.newV.bind(this, 'f')}>f</button>
                    <button onClick={this.newV.bind(this, 'v')}>v</button>
                    <button onClick={this.paste.bind(this)}>p</button>
                </span>;
            case 'literal':
                return <span className="borjes">{prev}<span className="borjes_literal">{opts.editable?
                    <input type="text" value={x.s} onChange={this.updateLiteral.bind(this)} />
                    :x.s}</span></span>;
            case 'tree':
                return <BorjesTree className="borjes" tree={x} opts={opts} />;
            case 'tfstruct':
            case 'fstruct':
                if (FStruct.get(x, 'symbol') !== undefined) {
                    return <span className="borjes">{Bjs.formatter.flist(x, 'symbol')}</span>;
                } else {
                    return <span className="borjes">{prev}<BorjesAVM x={x} update={update} opts={opts} /></span>;
                }
            case 'variable':
                return <span className="borjes">{prev}<BorjesVariable x={x} update={update} opts={opts} /></span>;
            case 'latticeel':
                return <span className="borjes">{prev}<span className="borjes_latticeel">{x.e}</span></span>;
        }
        return <span className="borjes">Unrecognized Object</span>;
    }

}

export default BorjesComponent;
