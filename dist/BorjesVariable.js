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

var World = _borjes2.default.types.World;

var BorjesAVM = function (_React$Component) {
    _inherits(BorjesAVM, _React$Component);

    function BorjesAVM(props) {
        _classCallCheck(this, BorjesAVM);

        var _this = _possibleConstructorReturn(this, (BorjesAVM.__proto__ || Object.getPrototypeOf(BorjesAVM)).call(this, props));

        var show = _this.props.opts.show;
        if (show === undefined) {
            show = true;
        }
        _this.state = { show: show };
        return _this;
    }

    _createClass(BorjesAVM, [{
        key: 'toggle',
        value: function toggle(e) {
            this.setState({ show: !this.state.show });
            e.stopPropagation();
        }
    }, {
        key: 'updateV',
        value: function updateV(value) {
            var x = this.props.x;
            World.set(this.props.opts.world, x.index, value);
            this.props.update(x);
        }
    }, {
        key: 'updateT',
        value: function updateT(e) {
            var x = this.props.x;
            this.props.opts.world.titles[x.index] = e.target.value;
            this.props.update(x);
        }
    }, {
        key: 'render',
        value: function render() {
            var x = this.props.x;
            var w = this.props.opts.world;
            var value = World.get(w, x.index);
            return _react2.default.createElement(
                'span',
                null,
                this.props.opts.editable ? _react2.default.createElement('input', { className: 'borjes_variable', type: 'text', value: w.titles[x.index], onChange: this.updateT.bind(this) }) : _react2.default.createElement(
                    'a',
                    { className: 'borjes_variable', onClick: this.toggle.bind(this) },
                    w.titles[x.index]
                ),
                _react2.default.createElement(
                    'span',
                    { className: this.state.show ? "borjes_visible" : "borjes_hidden" },
                    _react2.default.createElement(_BorjesComponent2.default, { update: this.updateV.bind(this), refresh: this.props.refresh, x: value, opts: this.props.opts })
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

