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

    updateV (value) {
        var x = this.props.x;
        World.set(this.props.opts.world, x.index, value);
        this.props.update(x);
    }

    updateT (e) {
        var x = this.props.x;
        this.props.opts.world.titles[x.index] = e.target.value;
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var w = this.props.opts.world;
        var value = World.resolve(w, x);
        return <span>
            {this.props.opts.editable
                ?<input className="borjes_variable" type="text" value={w.titles[x.index]} onChange={this.updateT.bind(this)} />
                :<a className="borjes_variable" onClick={this.toggle.bind(this)}>{w.titles[x.index]}</a>
            }
            <span className={this.state.show?"borjes_visible":"borjes_hidden"}>
                <BorjesComponent update={this.updateV.bind(this)} x={value} opts={this.props.opts} />
            </span>
        </span>;
    }

}

export default BorjesAVM;
