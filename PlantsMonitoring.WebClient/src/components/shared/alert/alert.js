import React, { Component } from 'react';
import NotificationAlert from "react-notification-alert";

class Alert extends Component {
    componentWillReceiveProps(nextProps) {
        const options = {
            place: 'br',
            message: nextProps.message,
            type: 'danger',
            icon: 'now-ui-icons ui-1_bell-53',
            autoDismiss: 7,
            closeButton: true
        }
        const alertRef = this.refs.errorAlert;
        if (nextProps.message && nextProps.message !== this.props.message && alertRef) {
            alertRef.notificationAlert(options);
        }
    }
    render() {
        return (
            <NotificationAlert key="alert" ref="errorAlert" />
        );
    }

}

export default Alert;