"use strict";

import React from 'react';
import Bjs from 'borjes';

import BorjesComponent from './BorjesComponent';

class BorjesSet extends React.Component {

    update (i, v) {
        var x = this.props.x;
        x.e[i] = v;
        this.props.update(x);
    }

    rm (i) {
        var x = this.props.x;
        x.e.splice(i, 1);
        this.props.update(x);
    }

    append () {
        var x = this.props.x;
        x.e.push(Bjs.types.Anything);
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        return <span className="borjes_set">
            {x.e.map((el, i) => <span key={i}>
                {i>0?",":null}
                {opts.editable?<button onClick={this.rm.bind(this, i)}>x</button>:null}
                <BorjesComponent x={el} refresh={this.props.refresh} update={this.update.bind(this, i)} opts={opts} />
            </span>)}
            {opts.editable?<button onClick={this.append.bind(this)}>+</button>:null}
        </span>;
    }

}

export default BorjesSet;
