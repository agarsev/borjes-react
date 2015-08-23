"use strict";

import React from 'react';
import BorjesComponent from './BorjesComponent';

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

    update (who, val) {
        var o = this.props.tree;
        if (who == -1) {
            o.node = val;
        } else {
            o.children[who] = val;
        }
        this.props.update(o);
    }

    render () {
        var o = this.props.tree;
        var opts = this.props.opts;
        var update = this.props.update;

        var oneStyle = {
            textAlign: "center"
        };
        var tableStyle = {
            textAlign: "center",
            borderCollapse: "collapse"
        };
        var textStyle = {
            padding: "0 2ex"
        };
        var centeredTextStyle = {
            padding: "0 2ex",
            display: 'inline-block',
            transform: 'translate(-50%, 0)'
        };
        if (o.children.length<2) {
            var branch;
            switch (this.props.branch) {
                case 'straight': branch=straightC; break;
                case 'left': branch=leftC; break;
                case 'right': branch=rightC; break;
            }
            return (<span style={oneStyle}>
                {branch?<div dangerouslySetInnerHTML={{__html:branch}} />:null}
                <div style={textStyle}>
                    <BorjesComponent x={o.node} update={this.update.bind(this, -1)} opts={opts} />
                </div>
                {o.children.length==0?null:
                    <BorjesTree branch="straight" tree={o.children[0]} update={this.update.bind(this, 0)} opts={opts} />}
            </span>);
        } else if (o.children.length == 2) {
            var branch;
            switch (this.props.branch) {
                case 'straight': branch=<tr><td colSpan="2" dangerouslySetInnerHTML={{__html:straightC}}/></tr>; break;
                case 'left': branch=<tr><td /><td dangerouslySetInnerHTML={{__html:leftN}}/></tr>; break;
                case 'right': branch=<tr><td dangerouslySetInnerHTML={{__html:rightN}}/><td /></tr>; break;
            }
            return (<table style={tableStyle}>
                    {branch}
                    <tr><td></td><td style={{textAlign: 'left'}}>
                        <span style={centeredTextStyle}><BorjesComponent x={o.node} update={this.update.bind(this, -1)} opts={opts} /></span>
                    </td></tr>
                    <tr><td style={{verticalAlign: 'top'}}>
                        <BorjesTree branch="left" tree={o.children[0]} update={this.update.bind(this, 0)} opts={opts} />
                    </td><td style={{verticalAlign: 'top'}}>
                        <BorjesTree branch="right" tree={o.children[1]} update={this.update.bind(this, 1)} opts={opts} />
                    </td></tr>
            </table>);
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.tree !== this.props.tree || nextProps.opts !== this.props.opts;
    }

}

export default BorjesTree;
