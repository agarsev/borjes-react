"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.state = { show: false, off: _this.off.bind(_this) };
        return _this;
    }

    _createClass(Menu, [{
        key: "on",
        value: function on(e) {
            document.addEventListener("click", this.state.off);
            this.setState({ show: true });
            e.stopPropagation();
        }
    }, {
        key: "off",
        value: function off(e) {
            document.removeEventListener("click", this.state.off);
            this.setState({ show: false });
            e.stopPropagation();
        }
    }, {
        key: "render",
        value: function render() {
            var containerStyle = {
                position: 'relative'
            };
            var popupStyle = {
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                top: '100%',
                left: 0
            };

            var show = this.state.show;

            return _react2.default.createElement(
                "span",
                { className: "borjes_menu", style: containerStyle },
                _react2.default.createElement(
                    "button",
                    { className: "small", onClick: show ? this.off.bind(this) : this.on.bind(this) },
                    show ? '▴' : '▾'
                ),
                show ? _react2.default.createElement(
                    "div",
                    { style: popupStyle },
                    this.props.children
                ) : null
            );
        }
    }]);

    return Menu;
}(_react2.default.Component);

exports.default = Menu;

