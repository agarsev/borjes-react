"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _borjes = require('borjes');

var _borjes2 = _interopRequireDefault(_borjes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BorjesProtoLattice = function (_React$Component) {
    _inherits(BorjesProtoLattice, _React$Component);

    function BorjesProtoLattice() {
        _classCallCheck(this, BorjesProtoLattice);

        return _possibleConstructorReturn(this, (BorjesProtoLattice.__proto__ || Object.getPrototypeOf(BorjesProtoLattice)).apply(this, arguments));
    }

    _createClass(BorjesProtoLattice, [{
        key: 'update',
        value: function update(el, sub) {
            var x = this.props.x;
            if (sub !== null && Object.keys(sub).length == 0) {
                sub = null;
            }
            x[el] = sub;
            this.props.update(x);
        }
    }, {
        key: 'addEl',
        value: function addEl() {
            var el = this.newEl.value;
            var x = this.props.x;
            if (el.length > 0 && x[el] === undefined) {
                x[el] = null;
                this.props.update(x);
            }
        }
    }, {
        key: 'remEl',
        value: function remEl(el) {
            var x = this.props.x;
            delete x[el];
            this.props.update(x);
        }
    }, {
        key: 'cpEl',
        value: function cpEl(el) {
            this.props.opts.cpbuffer.v = {
                borjes: 'latticeel',
                l: this.props.name || this.props.opts.name,
                e: el
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var x = this.props.x;
            var opts = this.props.opts;
            opts.cpbuffer = this.props.cpbuffer || opts.cpbuffer || {};
            opts.name = this.props.name || opts.name;
            var contStyle = {
                display: 'flex',
                flexDirection: 'column'
            };
            var rowStyle = {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            };

            if (!opts.child) {
                opts.child = true;
                opts.refs = {};
                return _react2.default.createElement(
                    'span',
                    { style: rowStyle },
                    '\u22A4\u2014',
                    _react2.default.createElement(BorjesProtoLattice, { x: x, opts: opts, update: this.props.update })
                );
            }

            var i = 0;
            return _react2.default.createElement(
                'span',
                { style: contStyle, className: 'borjes borjes_latticeproto' },
                Object.keys(x).map(function (k) {
                    var first = !opts.refs[k];
                    opts.refs[k] = true;
                    var after = first && (opts.editable || x[k] !== null);
                    return _react2.default.createElement(
                        'span',
                        { key: k + i++, style: rowStyle },
                        opts.editable ? _react2.default.createElement(
                            'button',
                            { className: 'small', onClick: _this2.remEl.bind(_this2, k) },
                            'x'
                        ) : null,
                        opts.editable && opts.name ? _react2.default.createElement(
                            'button',
                            { className: 'small', onClick: _this2.cpEl.bind(_this2, k) },
                            'c'
                        ) : null,
                        _react2.default.createElement(
                            'span',
                            { className: first ? "borjes_lpel_first" : "borjes_lpel_ref" },
                            k
                        ),
                        after ? '—' : null,
                        after ? _react2.default.createElement(BorjesProtoLattice, { x: x[k] || {}, opts: opts, update: _this2.update.bind(_this2, k) }) : null
                    );
                }),
                opts.editable ? _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('input', { ref: function ref(d) {
                            return _this2.newEl = d;
                        }, type: 'text' }),
                    _react2.default.createElement(
                        'button',
                        { onClick: this.addEl.bind(this) },
                        '+'
                    )
                ) : null
            );
        }
    }]);

    return BorjesProtoLattice;
}(_react2.default.Component);

exports.default = BorjesProtoLattice;

