"use strict";

import React from 'react';
import Bjs from 'borjes';

var Lattice = Bjs.types.Lattice;

class BorjesLatticeElement extends React.Component {

    change (e) {
        var x = this.props.x;
        this.props.update(Lattice.element(Lattice.from_element(x), e.target.value));
    }

    render () {
        var x = this.props.x;
        if (this.props.opts.editable) {
            return <select className="borjes_latticeel"
                           defaultValue={x.e}
                           onChange={this.change.bind(this)}>
                {Object.keys(Lattice.from_element(x).bits).map(function(name) {
                        return <option key={name}>{name}</option>;
                })}
            </select>;
        } else {
            return <span className="borjes_latticeel">{x.e}</span>;
        }
    }

}

export default BorjesLatticeElement;
