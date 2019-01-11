import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as groupsActions from '../../actions/groups.actions';
import SimpleReactValidator from 'simple-react-validator';

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGroup: {
                name: '',
                description: ''
            }
        };
        this.validator = new SimpleReactValidator({
            className: 'text-danger'
        });
    }

    handleNameChange = (event) => {
        this.setState({ newGroup: { ...this.state.newGroup, name: event.target.value } });
    }

    handleDescriptionChange = (event) => {
        this.setState({ newGroup: { ...this.state.newGroup, description: event.target.value } });
    }

    submit = (event) => {
        if (this.validator.allValid()) {
            this.props.createGroup(this.state.newGroup)
                .then(() => this.props.close());
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
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
                                    {this.validator.message('name', this.state.newGroup.name, 'required|min:2')}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea rows="4" cols="80" className="form-control" onChange={this.handleDescriptionChange}></textarea>
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