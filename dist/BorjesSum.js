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

var BorjesSum = function (_React$Component) {
    _inherits(BorjesSum, _React$Component);

    function BorjesSum() {
        _classCallCheck(this, BorjesSum);

        return _possibleConstructorReturn(this, (BorjesSum.__proto__ || Object.getPrototypeOf(BorjesSum)).apply(this, arguments));
    }

    _createClass(BorjesSum, [{
        key: 'updateEl',
        value: function updateEl(v) {
            var x = this.props.x;
            x.el = v;
            this.props.update(x);
        }
    }, {
        key: 'updateRest',
        value: function updateRest(v) {
            var x = this.props.x;
            x.rest = v;
            this.props.update(x);
        }
    }, {
        key: 'render',
        value: function render() {
            var x = this.props.x;
            var opts = this.props.opts;
            return _react2.default.createElement(
                'span',
                { className: 'borjes_sum' },
                _react2.default.createElement(
                    'span',
                    { className: 'borjes_set' },
                    _react2.default.createElement(_BorjesComponent2.default, { x: x.el, refresh: this.props.refresh, update: this.updateEl.bind(this), opts: opts })
                ),
                "⋃",
                _react2.default.createElement(_BorjesComponent2.default, { x: x.rest, refresh: this.props.refresh, update: this.updateRest.bind(this), opts: opts })
            );
        }
    }]);

    return BorjesSum;
}(_react2.default.Component);

// ∪


exports.default = BorjesSum;

