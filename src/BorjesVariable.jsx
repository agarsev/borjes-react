"use strict";

import React from 'react';
import Bjs from 'borjes';

import BorjesComponent from './BorjesComponent';

var World = Bjs.types.World;

class BorjesAVM extends React.Component {

    constructor (props) {
        super(props);
        var show = this.props.opts.show;
        if (show === undefined) { show = true; }
        this.state = { show };
    }

    toggle () {
        this.setState({ show: !this.state.show });
    }
    render () {
        var x = this.props.x;
        var value = World.resolve(this.props.opts.world, x);
        return <span>
            <a className="borjes_variable" onClick={this.toggle.bind(this)}>{x.index}</a>
            <span className={this.state.show?"borjes_visible":"borjes_hidden"}>
                <BorjesComponent x={value} opts={this.props.opts} />
            </span>
        </span>;
    }

}

export default BorjesAVM;