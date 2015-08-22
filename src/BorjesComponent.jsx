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

    render () {
        var x = this.props.x;
        var opts = this.props.opts || {};
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
            prev = <button onClick={this.remove.bind(this)}>x</button>;
        }
        switch (x.borjes) {
            case 'anything':
                return <span>
                    <button onClick={update.bind(undefined, Bjs.types.Literal(''))}>l</button>
                    <button onClick={update.bind(undefined, FStruct())}>f</button>
                </span>;
            case 'literal':
                return <span>{prev}<span className="borjes_literal">{opts.editable?
                    <input type="text" value={x.s} onChange={this.updateLiteral.bind(this)} />
                    :x.s}</span></span>;
            case 'tree':
                return <BorjesTree tree={x} opts={opts} />;
            case 'tfstruct':
            case 'fstruct':
                if (FStruct.get(x, 'symbol') !== undefined) {
                    return <span>{Bjs.formatter.flist(x, 'symbol')}</span>;
                } else {
                    return <span>{prev}<BorjesAVM x={x} update={update} opts={opts} /></span>;
                }
            case 'variable':
                return <span>{prev}<BorjesVariable x={x} update={update} opts={opts} /></span>;
            case 'latticeel':
                return <span>{prev}<span className="borjes_latticeel">{x.e}</span></span>;
        }
        return <span>Unrecognized Object</span>;
    }

}

export default BorjesComponent;
