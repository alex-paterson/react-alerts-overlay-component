'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var alertsReducer = function alertsReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case 'ADD_ALERT':
      return [].concat(_toConsumableArray(state), [{
        text: action.text,
        style: action.style,
        id: (0, _nodeUuid2.default)()
      }]);

    case 'REMOVE_ALERT':
      return state.filter(function (alert) {
        if (alert.id === action.id) {
          return false;
        } else {
          return true;
        }
      });

    default:
      return state;
  }
};

var addAlert = function addAlert(text, style) {
  return {
    type: 'ADD_ALERT',
    text: text,
    style: style
  };
};

var _removeAlert = function _removeAlert(id) {
  return {
    type: 'REMOVE_ALERT',
    id: id
  };
};

var AlertsOverlayComponent = _react2.default.createClass({
  displayName: 'AlertsOverlayComponent',

  render: function render() {
    var _props = this.props;
    var alerts = _props.alerts;
    var children = _props.children;
    var style = _props.style;


    if (!alerts) {
      throw "AlertsOverlayComponent tried to render but alerts was not defined. \n\
Remember pass alerts (from state) as props: \n\
\n\
<AlertsOverlayComponent alerts={alerts}>\n\
  <Alert />\n\
</AlertsOverlayComponent>\n\
";
    }

    if (!children) {
      throw "AlertsOverlayComponent tried to render but no child was defined. \n\
Remember pass a child: \n\
\n\
<AlertsOverlayComponent alerts={alerts}>\n\
  <Alert />\n\
</AlertsOverlayComponent>\n\
";
    }

    var renderAlerts = function renderAlerts() {
      return alerts.map(function (alert) {
        return _react2.default.cloneElement(children, { alert: alert, key: alert.id });
      });
    };

    return _react2.default.createElement(
      'div',
      { className: 'react-alerts-overlay-component-container' },
      renderAlerts()
    );
  }
});

var Alert = _react2.default.createClass({
  displayName: 'Alert',

  removeAlert: function removeAlert() {
    var _props2 = this.props;
    var dispatch = _props2.dispatch;
    var alert = _props2.alert;

    dispatch(_removeAlert(alert.id));
  },
  render: function render() {
    var _props3 = this.props;
    var alert = _props3.alert;
    var style = _props3.style;

    return _react2.default.createElement(
      'div',
      { className: alert.style, key: alert.id, onClick: this.removeAlert, style: style },
      _react2.default.createElement(
        'div',
        { className: 'flex' },
        _react2.default.createElement(
          'div',
          null,
          alert.text
        ),
        _react2.default.createElement(
          'div',
          { className: 'settings-action' },
          _react2.default.createElement('i', { className: 'fa fa-close' })
        )
      )
    );
  }
});

// var mapAlertsToProps = (state) => {
//   return {
//     alerts: state.alerts
//   }
// }

module.exports = {
  default: AlertsOverlayComponent,
  Alert: Alert,
  AlertsOverlayComponent: AlertsOverlayComponent,
  addAlert: addAlert,
  removeAlert: _removeAlert,
  alertsReducer: alertsReducer
};