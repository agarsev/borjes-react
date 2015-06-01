"use strict";

import React from 'react';
import Bjs from 'borjes';

var FStruct = Bjs.types.FStruct;

import BorjesTree from './BorjesTree';
import BorjesAVM from './BorjesAVM';

class BorjesComponent extends React.Component {

    render () {
        var x = this.props.x;
        var opts = this.props.opts || {};
        if (typeof x !== 'object') {
            return <span>{x}</span>;
        }
        if (x instanceof Array) {
            return (<div>
                {x.map((y, i) => <BorjesComponent opts={opts} key={i} x={y} />)}
            </div>);
        }
        switch (x.borjes) {
            case 'literal':
                return <span className="borjes_literal">{x.s}</span>;
            case 'tree':
                return <BorjesTree tree={x} opts={opts} />;
            case 'tfstruct':
            case 'fstruct':
                if (FStruct.get(x, 'symbol') !== undefined) {
                    return <span>{Bjs.formatter.flist(x, 'symbol')}</span>;
                } else {
                    return <BorjesAVM x={x} opts={opts} />;
                }
        }
        return <span>Unrecognized Object</span>;
    }

}

export default BorjesComponent;
