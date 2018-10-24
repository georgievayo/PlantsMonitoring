import React, { Component } from 'react';
import Select from 'react-select'
import { connect } from 'react-redux';
import * as groupsActions from '../../actions/groups.actions';

class CreateDevice extends Component {
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
                    <input type="text" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Plant type</label>
                    <Select options={groupsOptions} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 offset-md-4">
                  <button id="close-btn" onClick={this.props.close}>
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
    getGroups: dispatch(groupsActions.getAllGroups())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDevice);