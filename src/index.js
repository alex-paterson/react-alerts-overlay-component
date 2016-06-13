import React from 'react';
import {connect} from 'react-redux';

import uuid from 'node-uuid';


var alertsReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_ALERT':
      return [
        ...state,
        {
          text: action.text,
          style: action.style,
          id: uuid()
        }
      ];

    case 'REMOVE_ALERT':
      return state.filter((alert) => {
        if (alert.id === action.id ) {
          return false;
        } else {
          return true;
        }
      });

    default:
      return state;
  }
};


var addAlert = (text, style) => {
  return {
    type: 'ADD_ALERT',
    text,
    style
  };
};

var removeAlert = (id) => {
  return {
    type: 'REMOVE_ALERT',
    id
  };
};


var AlertsOverlayComponent = React.createClass({
  render: function() {
    var {alerts, children, style} = this.props;

    if (!alerts) {
      throw (
"AlertsOverlayComponent tried to render but alerts was not defined. \n\
Remember pass alerts (from state) as props: \n\
\n\
<AlertsOverlayComponent alerts={alerts}>\n\
  <Alert />\n\
</AlertsOverlayComponent>\n\
");
    }

    if (!children) {
      throw (
"AlertsOverlayComponent tried to render but no child was defined. \n\
Remember pass a child: \n\
\n\
<AlertsOverlayComponent alerts={alerts}>\n\
  <Alert />\n\
</AlertsOverlayComponent>\n\
");
    }

    var renderAlerts = function() {
      return alerts.map(function(alert) {
        return React.cloneElement(children, {alert: alert, key: alert.id});
      });
    }

    return (
      <div className="react-alerts-overlay-component-container">
        {renderAlerts()}
      </div>
    );
  }
});


var Alert = React.createClass({
  removeAlert: function() {
    var {dispatch, alert} = this.props;
    dispatch(removeAlert(alert.id));
  },
  render: function() {
    var {alert, style} = this.props;
    return (
      <div className={alert.style} key={alert.id} onClick={this.removeAlert} style={style}>
        <div className="flex">
          <div>
            {alert.text}
          </div>
          <div className="settings-action">
            <i className="fa fa-close"></i>
          </div>
        </div>
      </div>
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
  removeAlert: removeAlert,
  alertsReducer: alertsReducer
}
