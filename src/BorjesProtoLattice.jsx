"use strict";

import React from 'react';
import Bjs from 'borjes';

class BorjesProtoLattice extends React.Component {

    render () {
        var x = this.props.x;
        var contStyle = {
            display: 'flex',
            flexDirection: 'column'
        };
        var rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        };

        if (!this.props.child) {
            return <span style={rowStyle}>
                ⊤—<BorjesProtoLattice x={x} child={true} />
            </span>;
        }

        var i=0;
        return <span style={contStyle} className="borjes_latticeproto" >
            {Object.keys(x).map((k) => {
                var after = x[k] !== null;
                return <span key={k+(i++)} style={rowStyle}>
                    {k}
                    {after?'—':null}
                    {after?<BorjesProtoLattice x={x[k]} child={true} />:null}
                </span>;
            })}
        </span>;
    }

}

export default BorjesProtoLattice;
