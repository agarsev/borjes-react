"use strict";

import React from 'react';
import Bjs from 'borjes';

import BorjesComponent from './BorjesComponent';

class BorjesDisjunct extends React.Component {

    update (i, val) {
        var x = this.props.x;
        x.a[i] = val;
        this.props.update(x);
    }

    remove (i) {
        var x = this.props.x;
        x.a.splice(i, 1);
        this.props.update(x);
    }

    append (i) {
        var x = this.props.x;
        x.a.push(Bjs.types.Anything);
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        return <span className="borjes_disjunct">
            {x.a.map((a, i) => <span>
                {i>0?'⋁':null}
                {opts.editable?<button onClick={this.remove.bind(this, i)}>x</button>:null}
                <BorjesComponent x={a} refresh={this.props.refresh} update={this.update.bind(this, i)} opts={opts} />
            </span>)}
            {opts.editable?<button onClick={this.append.bind(this)}>+</button>:null}
        </span>;
    }

}

export default BorjesDisjunct;
