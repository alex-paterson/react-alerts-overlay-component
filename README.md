# React Alerts Overlay Component

This module contains a reducer, actions, and components for presenting alerts.

## Installation

Available as an npm package -- simply run `npm install react-alerts-overlay-component`.

## Usage

Set up your reducer:

```javascript
/* reducers.jsx */
import {combineReducers} from 'redux';
import {alertsReducer} from 'react-alerts-overlay-component';

export default combineReducers({
  alerts: alertsReducer
});
```

Now render AlertsOverlayComponent as follows:

```javascript
/* Main.jsx */
import React = from 'react';
import {connect} from 'react-redux';
import {
  addAlert,
  removeAlert,
  AlertsOverlayComponent
} = from 'react-alerts-overlay-component';


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

```

## Remember

You must pass alerts (from state) to AlertsOverlayComponent as a prop: `<AlertsOverlayComponent alerts={alerts} style={{padding: '1rem'}}>`.

You must pass a child Alert object to AlertsOverlayComponent: `<AlertsOverlayComponent alerts={alerts} style={{padding: '1rem'}}>`.

You can pass styles to AlertsOverlayComponent: `<AlertsOverlayComponent alerts={alerts} style={{padding: '1rem'}}> ...`.

You can pass styles to Alert: `<Alert style={{padding: '1rem'}} />`.
