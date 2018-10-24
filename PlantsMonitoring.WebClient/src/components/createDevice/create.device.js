import React, { Component } from 'react';
import Select from 'react-select'
import { connect } from 'react-redux';
import * as groupsActions from '../../actions/groups.actions';
import * as devicesActions from '../../actions/devices.actions';

class CreateDevice extends Component {
  state = {
    newDevice: {
      name: '',
      groupId: ''
    }
  };

  handleNameChange = (event) => {
    this.setState({newDevice: {...this.state.newDevice, name: event.target.value}})
  }
  selectGroup = (group) => {
    this.setState({newDevice: {
      ...this.state.newDevice,
      groupId: group.option
    }});
  }

  render() {
    const { groups } = this.props;
    const groupsOptions = groups.map(g => {
      return {
        label: g.name,
        option: g.id
      }
    });

    return (
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <h5 className="title">Add Device</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Device Name</label>
                    <input type="text" className="form-control" onChange={(event) => this.handleNameChange(event)} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Plant type</label>
                    <Select options={groupsOptions} onChange={this.selectGroup} />
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-4 offset-md-2">
              <button className="create-device-btn" onClick={(event) => this.props.createDevice(this.state.newDevice)}>
                <i className="now-ui-icons arrows-1_cloud-upload-94"></i>
                <span> Create</span>
              </button>
              </div>
                <div className="col-md-4">
                  <button className="create-device-btn" onClick={this.props.close}>
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                    <span> Close</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    groups: state.groups.groups
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getGroups: dispatch(groupsActions.getAllGroups()),
    createDevice: (device) => dispatch(devicesActions.postDevice(device))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDevice);