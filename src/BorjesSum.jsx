"use strict";

import React from 'react';
import Bjs from 'borjes';

import BorjesComponent from './BorjesComponent';

class BorjesSum extends React.Component {

    updateEl (v) {
        var x = this.props.x;
        x.el = v;
        this.props.update(x);
    }

    updateRest (v) {
        var x = this.props.x;
        x.rest = v;
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        return <span className="borjes_sum">
            <span className="borjes_set">
                <BorjesComponent x={x.el} refresh={this.props.refresh} update={this.updateEl.bind(this)} opts={opts} />
            </span>
            {"⋃"}
            <BorjesComponent x={x.rest} refresh={this.props.refresh} update={this.updateRest.bind(this)} opts={opts} />
        </span>;
    }

}

// ∪
export default BorjesSum;
