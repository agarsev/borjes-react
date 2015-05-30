"use strict";

import React from 'react';
import bjs from 'borjes';

class BorjesComponent extends React.Component {

    render () {
        var x = this.props.x;
        if (typeof x !== 'object') {
            return <span>{x}</span>;
        }
        if (x instanceof Array) {
            return (<div>
                {x.map((y, i) => <BorjesComponent key={i} x={y} />)}
            </div>);
        }
        switch (x.borjes) {
            case 'tree':
                return <BorjesTree tree={x} />;
            case 'fstruct':
                return <span>{bjs.formatter.flist(x, 'symbol')}</span>;
        }
        return <span>Unrecognized Object</span>;
    }

}

export default BorjesComponent;
