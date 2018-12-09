import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as groupsActions from '../../actions/groups.actions';

class CreateGroup extends Component {
    state = {
        newGroup: {
            name: ''
        }
    };

    handleNameChange = (event) => {
        this.setState({ newGroup: { name: event.target.value } });
    }

    submit = (event) => {
        this.props.createGroup(this.state.newGroup)
            .then(() => this.props.close());
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Add Group</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" onChange={(event) => this.handleNameChange(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 offset-md-2">
                                <button className="create-device-btn" onClick={(event) => this.submit(event)}>
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
                    </div>
                </div>
            </div >
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        createGroup: (group) => dispatch(groupsActions.postGroup(group))
    };
}

export default connect(null, mapDispatchToProps)(CreateGroup);