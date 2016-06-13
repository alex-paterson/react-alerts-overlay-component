import React from 'react';
import {connect} from 'react-redux';
import {
  addAlert,
  removeAlert,
  AlertsOverlayComponent
} from 'react-alerts-overlay-component';



// This is an example of implementing an alert yourself.
// This exact implementation is available with:
// import {Alert} = from 'react-alert-overlay-component';
var Alert = connect()(React.createClass({
  removeAlert: function() {
    var {dispatch, alert} = this.props;
    dispatch(removeAlert(alert.id));
  },
  render: function() {
    var {alert} = this.props;
    return (
      <div className={alert.style} key={alert.id} onClick={this.removeAlert}>
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
}));

export var Main = React.createClass({
  componentDidMount: function() {
    var {dispatch} = this.props;
    dispatch(addAlert("Test alert!", "success"));
  },
  render: function() {
    var {alerts} = this.props;
    return (
      <div>
        <AlertsOverlayComponent alerts={alerts}>
          <Alert />
        </AlertsOverlayComponent>
      </div>
    );
  }
});

var mapAlertsToProps = (state) => {
  return {
    alerts: state.alerts
  }
}

module.exports = connect(mapAlertsToProps)(Main);
