"use strict";

import React from 'react';
import Bjs from 'borjes';

import BorjesComponent from './BorjesComponent';

class BorjesList extends React.Component {

    updateFst (v) {
        var x = this.props.x;
        x.first = v;
        this.props.update(x);
    }

    updateRest (v) {
        var x = this.props.x;
        x.rest = v;
        this.props.update(x);
    }

    append () {
        var x = this.props.x;
        x.rest = Bjs.types.List(Bjs.types.Anything);
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        if (x.borjes === 'list_empty') {
            return <span className="borjes_list"></span>;
        }
        var aft = [];
        var i = 0;
        var rest = x.rest;
        if (!opts.editable) {
            while (rest.borjes === 'list') {
                aft.push(",");
                aft.push(<BorjesComponent key={i} x={rest.first} refresh={this.error} update={this.error} opts={opts} />);
                i++;
                rest = rest.rest;
            }
        }
        return <span className="borjes_list">
            <BorjesComponent x={x.first} refresh={this.props.refresh} update={this.updateFst.bind(this)} opts={opts} />
            {aft}
            {rest.borjes !== 'list_empty'?",":null}
            {rest.borjes !== 'list_empty'?<BorjesComponent x={rest} refresh={this.props.refresh} update={this.updateRest.bind(this)} opts={opts} />:null}
            {rest.borjes === 'list_empty' && opts.editable?<button onClick={this.append.bind(this)}>+</button>:null}
        </span>;
    }

}

export default BorjesList;
