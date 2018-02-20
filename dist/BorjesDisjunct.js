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

var BorjesDisjunct = function (_React$Component) {
    _inherits(BorjesDisjunct, _React$Component);

    function BorjesDisjunct() {
        _classCallCheck(this, BorjesDisjunct);

        return _possibleConstructorReturn(this, (BorjesDisjunct.__proto__ || Object.getPrototypeOf(BorjesDisjunct)).apply(this, arguments));
    }

    _createClass(BorjesDisjunct, [{
        key: 'update',
        value: function update(i, val) {
            var x = this.props.x;
            x.a[i] = val;
            this.props.update(x);
        }
    }, {
        key: 'remove',
        value: function remove(i) {
            var x = this.props.x;
            x.a.splice(i, 1);
            this.props.update(x);
        }
    }, {
        key: 'append',
        value: function append(i) {
            var x = this.props.x;
            x.a.push(_borjes2.default.types.Anything);
            this.props.update(x);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var x = this.props.x;
            var opts = this.props.opts;
            return _react2.default.createElement(
                'span',
                { className: 'borjes_disjunct' },
                x.a.map(function (a, i) {
                    return _react2.default.createElement(
                        'span',
                        { key: 'alt' + i },
                        i > 0 ? '⋁' : null,
                        opts.editable ? _react2.default.createElement(
                            'button',
                            { onClick: _this2.remove.bind(_this2, i) },
                            'x'
                        ) : null,
                        _react2.default.createElement(_BorjesComponent2.default, { x: a, refresh: _this2.props.refresh, update: _this2.update.bind(_this2, i), opts: opts })
                    );
                }),
                opts.editable ? _react2.default.createElement(
                    'button',
                    { onClick: this.append.bind(this) },
                    '+'
                ) : null
            );
        }
    }]);

    return BorjesDisjunct;
}(_react2.default.Component);

exports.default = BorjesDisjunct;

