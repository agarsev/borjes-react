"use strict";

import React from 'react';
import BorjesComponent from './BorjesComponent';

class BorjesList extends React.Component {

    updateFst () {}
    updateRest () {}
    updateColl () {}

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        if (x.borjes === 'list_empty') {
            return <span>{"<>"}</span>;
        }
        var aft = [];
        var i = 0;
        var rest = x.rest;
        while (rest.borjes === 'list') {
            aft.push(",");
            aft.push(<BorjesComponent key={i} x={rest.first} refresh={this.props.refresh} update={this.updateColl.bind(this, i)} opts={opts} />);
            i++;
            rest = rest.rest;
        }
        return <span>
            {"<"}
            <BorjesComponent x={x.first} refresh={this.props.refresh} update={this.updateFst.bind(this)} opts={opts} />
            {aft}
            {rest.borjes !== 'list_empty'?",":null}
            {rest.borjes !== 'list_empty'?<BorjesComponent x={rest} refresh={this.props.refresh} update={this.updateRest.bind(this)} opts={opts} />:null}
            {">"}
        </span>;
    }

}

export default BorjesList;
