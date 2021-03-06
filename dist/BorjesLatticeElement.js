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

var Lattice = _borjes2.default.types.Lattice;

var BorjesLatticeElement = function (_React$Component) {
    _inherits(BorjesLatticeElement, _React$Component);

    function BorjesLatticeElement() {
        _classCallCheck(this, BorjesLatticeElement);

        return _possibleConstructorReturn(this, (BorjesLatticeElement.__proto__ || Object.getPrototypeOf(BorjesLatticeElement)).apply(this, arguments));
    }

    _createClass(BorjesLatticeElement, [{
        key: 'change',
        value: function change(e) {
            var x = this.props.x;
            this.props.update(Lattice.element(Lattice.from_element(x), e.target.value));
        }
    }, {
        key: 'render',
        value: function render() {
            var x = this.props.x;
            if (this.props.opts.editable) {
                return _react2.default.createElement(
                    'select',
                    { className: 'borjes_latticeel',
                        value: x.e,
                        onChange: this.change.bind(this) },
                    Object.keys(Lattice.from_element(x).bits).map(function (name) {
                        return _react2.default.createElement(
                            'option',
                            { key: name },
                            name
                        );
                    })
                );
            } else {
                return _react2.default.createElement(
                    'span',
                    { className: 'borjes_latticeel' },
                    x.e
                );
            }
        }
    }]);

    return BorjesLatticeElement;
}(_react2.default.Component);

exports.default = BorjesLatticeElement;

