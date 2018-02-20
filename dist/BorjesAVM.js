"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _borjes = require('borjes');

var _borjes2 = _interopRequireDefault(_borjes);

var _BorjesComponent = require('./BorjesComponent');

var _BorjesComponent2 = _interopRequireDefault(_BorjesComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FStruct = _borjes2.default.types.FStruct;
var Anything = _borjes2.default.types.Anything;

var BorjesAVM = function (_React$Component) {
    _inherits(BorjesAVM, _React$Component);

    function BorjesAVM(props) {
        _classCallCheck(this, BorjesAVM);

        var _this = _possibleConstructorReturn(this, (BorjesAVM.__proto__ || Object.getPrototypeOf(BorjesAVM)).call(this, props));

        var show = _this.props.opts.show;
        if (show === undefined) {
            show = true;
        }
        var showF = {};
        var x = _this.props.x;
        x.f.forEach(function (f) {
            return showF[f] = !(_this.props.opts.hide_more && (f === 'head_dtr' || f === 'nonh_dtr'));
        });
        _this.state = { show: show, showF: showF };
        return _this;
    }

    _createClass(BorjesAVM, [{
        key: 'toggle',
        value: function toggle(e) {
            this.setState({ show: !this.state.show });
            e.stopPropagation();
        }
    }, {
        key: 'toggleF',
        value: function toggleF(f, e) {
            var showF = this.state.showF;
            showF[f] = !showF[f];
            this.setState({ showF: showF });
            e.stopPropagation();
        }
    }, {
        key: 'updateF',
        value: function updateF(feat, value) {
            var x = this.props.x;
            FStruct.set(x, feat, value);
            this.props.update(x);
        }
    }, {
        key: 'addF',
        value: function addF() {
            var f = this.newF.value;
            if (f.length > 0) {
                var x = this.props.x;
                FStruct.set(x, f, Anything);
                var s = this.state;
                s.showF[f] = true;
                this.setState(s);
                this.props.update(x);
            }
        }
    }, {
        key: 'rmF',
        value: function rmF(f) {
            var x = this.props.x;
            FStruct.unset(x, f);
            this.props.update(x);
        }
    }, {
        key: 'updateType',
        value: function updateType(t) {
            var x = this.props.x;
            if (t !== Anything && x.borjes !== 'tfstruct') {
                x = _borjes2.default.types.TFS(t, x.v, x.f);
            } else {
                x.type = t;
            }
            this.props.update(x);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var x = this.props.x;
            var opts = this.props.opts;
            var atrs = x.f;
            var refresh = this.props.refresh;
            if (x.borjes === 'tfstruct' && !opts.editable && atrs.length == 0) {
                return _react2.default.createElement(
                    'span',
                    { className: 'borjes_typerestr' },
                    x.type.e
                );
            }
            return _react2.default.createElement(
                'table',
                { className: 'borjes_fs' },
                x.borjes === 'tfstruct' || opts.editable ? _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'th',
                            { colSpan: '2', onClick: opts.editable ? null : this.toggle.bind(this) },
                            _react2.default.createElement(_BorjesComponent2.default, { x: x.type || Anything, refresh: refresh, update: this.updateType.bind(this), opts: opts })
                        )
                    )
                ) : null,
                _react2.default.createElement(
                    'tbody',
                    { className: this.state.show ? 'borjes_visible' : 'borjes_hidden' },
                    atrs.map(function (f) {
                        var val = FStruct.get(x, f);
                        var fname = f;
                        if (!opts.editable) {
                            while (val.borjes === 'fstruct' && val.f.length == 1) {
                                fname += ' | ' + val.f[0];
                                val = FStruct.get(val, val.f[0]);
                            }
                        }
                        return _react2.default.createElement(
                            'tr',
                            { key: f },
                            _react2.default.createElement(
                                'td',
                                { className: 'borjes_feat' },
                                opts.editable ? _react2.default.createElement(
                                    'button',
                                    { className: 'small',
                                        onClick: _this2.rmF.bind(_this2, f) },
                                    'x'
                                ) : null,
                                _react2.default.createElement(
                                    'span',
                                    { onClick: _this2.toggleF.bind(_this2, f) },
                                    fname
                                )
                            ),
                            _react2.default.createElement(
                                'td',
                                null,
                                _this2.state.showF[f] ? _react2.default.createElement(_BorjesComponent2.default, { update: _this2.updateF.bind(_this2, f), refresh: refresh, x: val, opts: opts }) : null
                            )
                        );
                    }),
                    opts.editable ? _react2.default.createElement(
                        'tr',
                        null,
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement('input', { ref: function ref(d) {
                                    return _this2.newF = d;
                                }, type: 'text' }),
                            _react2.default.createElement(
                                'button',
                                { onClick: this.addF.bind(this) },
                                '+'
                            )
                        )
                    ) : null
                )
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var refresh = this.props.refresh;
            if (refresh) {
                refresh();
            }
        }
    }]);

    return BorjesAVM;
}(_react2.default.Component);

exports.default = BorjesAVM;

