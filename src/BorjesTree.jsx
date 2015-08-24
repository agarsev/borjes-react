"use strict";

import React from 'react';
import BorjesComponent from './BorjesComponent';

var branchHeight = 15;

var branch= '<svg xmlns="http://www.w3.org/2000/svg"'
           +' xmlns:xlink="http://www.w3.org/1999/xlink"'
           +' width="100%" height="0.6em"'
           +' preserveAspectRatio="none"'
           +' viewBox="0 0 100 100">';
var straightC = branch
           +'  <line x1="50" y1="100" x2="50" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>'
           +'</svg>';
var leftC = branch
           +'  <line x1="50" y1="100" x2="100" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>'
           +'</svg>';
var rightC = branch
           +'  <line x1="50" y1="100" x2="0" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>'
           +'</svg>';
var leftN = branch
           +'  <line x1="0" y1="100" x2="100" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>'
           +'</svg>';
var rightN = branch
           +'  <line x1="100" y1="100" x2="0" y2="0" style="stroke:#000000;" vector-effect="non-scaling-stroke"/>'
           +'</svg>';

class BorjesTree extends React.Component {

    constructor (props) {
        super(props);
        this.state = { branches: this.props.x.children.map(() => 'l') };
    }

    update (who, val) {
        var x = this.props.x;
        if (who == -1) {
            x.node = val;
        } else {
            x.children[who] = val;
        }
        this.props.update(x);
    }

    render () {
        var x = this.props.x;
        var opts = this.props.opts;
        var ub = this.updateBranches.bind(this);

        var containerStyle = {
            display: 'inline-flex',
            flexDirection: 'column'
        };
        var nodeStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        };
        var branchesStyle = {
            position: 'relative',
            height: branchHeight
        };
        var branchStyle = {
            position: 'absolute',
            height: branchHeight,
            top: 0
        };
        var childrenStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        };

        return <span style={containerStyle}>
            <div ref="nodeWrapper" style={nodeStyle}>
                <BorjesComponent x={x.node} refresh={ub} update={this.update.bind(this, -1)} opts={opts} />
            </div>
            <div style={branchesStyle}>
                {x.children.map((c, i) => {
                    var n = this.state.branches[i] == 'l' ? leftN : rightN;
                    return <span style={branchStyle} ref={"branch"+i} key={"branch"+i} dangerouslySetInnerHTML={{__html:n}} />;
                })}
            </div>
            <div style={childrenStyle}>
                {x.children.map((c, i) => {
                    return <BorjesComponent ref={"child"+i} key={"child"+i} x={c} refresh={ub} update={this.update.bind(this, i)} opts={opts} />
                })}
            </div>
        </span>;
    }

    componentDidMount () {
        this.updateBranches(true);
    }

    componentDidUpdate () {
        this.updateBranches();
    }

    updateBranches (first) {
        var rerender = false;
        var state = this.state;
        var cn = this.props.x.children;
        var nw = React.findDOMNode(this.refs.nodeWrapper);
        var half = nw.clientWidth/2;
        var start = nw.offsetLeft;
        for (var i=0; i<cn.length; i++) {
            var d = React.findDOMNode(this.refs["branch"+i]);
            var child = React.findDOMNode(this.refs["child"+i]);
            var left = (child.offsetLeft-start+child.clientWidth/2);
            var right = half-left;
            if (left>half) {
                d.style.width = (left-half)+'px';
                d.style.left = half+'px';
                if (state.branches[i] != 'r') {
                    state.branches[i] = 'r';
                    rerender = true;
                }
            } else {
                d.style.width = (half-left)+'px';
                d.style.left = left+'px';
                if (state.branches[i] != 'l') {
                    state.branches[i] = 'l';
                    rerender = true;
                }
            }
        }
        if (rerender) {
            this.setState(state);
        }
        if (!first) {
            var refresh = this.props.refresh;
            if (refresh) { refresh(); }
        }
    }

}

export default BorjesTree;
