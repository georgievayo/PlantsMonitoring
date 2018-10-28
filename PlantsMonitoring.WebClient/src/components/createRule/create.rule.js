import React, { Component } from 'react';
import Select from 'react-select'
import { connect } from 'react-redux';
import * as groupsActions from '../../actions/groups.actions';
import * as devicesActions from '../../actions/devices.actions';

const importanceOptions = [
    { label: 'Critical', option: 'Critical' }, 
    { label: 'Information', option: 'Information' },
    { label: 'Warning', option: 'Warning' }
];

const fieldOptions = [
    { label: 'Temperature', option: 'Temperature' }, 
    { label: 'Soil Moisture', option: 'Soil Moisture' },
    { label: 'Light', option: 'Light' }
];

const operatorOptions = [
    { label: '>=', option: '>=' }, 
    { label: '>', option: '>' },
    { label: '<=', option: '<=' },
    { label: '<', option: '<' },
    { label: '=', option: '=' }
];

class CreateRule extends Component {
    state = {
        newRule: {
            name: '',
            groupId: '',
            description: '',
            type: '',
            field: '',
            operator: '',
            value: ''
        }
    };

    componentDidMount() {
        this.props.getGroups();
    }

    handleNameChange = (event) => {
        this.setState({ newRule: { ...this.state.newRule, name: event.target.value } });
    }

    handleDescriptionChange = (event) => {
        this.setState({ newRule: { ...this.state.newRule, description: event.target.value } });
    }

    handleValueChange = (event) => {
        this.setState({ newRule: { ...this.state.newRule, value: event.target.value } });
    }

    selectGroup = (group) => {
        this.setState({ newRule: { ...this.state.newRule, groupId: group.option } });
    }

    selectType = (type) => {
        this.setState({ newRule: { ...this.state.newRule, type: type.option } });
    }

    selectField = (field) => {
        this.setState({ newRule: { ...this.state.newRule, field: field.option } });
    }

    selectOperator = (operator) => {
        this.setState({ newRule: { ...this.state.newRule, operator: operator.option } });
    }

    submit = (event) => {
        this.props.createRule(this.state.newRule)
            .then(() => this.props.close());
    }

    render() {
        const { groups } = this.props;
        const groupsOptions = groups.map(g => {
            return { label: g.name, option: g.id };
        });

        return (
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="title">Add Rule</h5>
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
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Importance</label>
                                    <Select options={importanceOptions} onChange={this.selectType} />
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
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Trigger</label>
                                    <Select options={fieldOptions} onChange={this.selectField} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Operator</label>
                                    <Select options={operatorOptions} onChange={this.selectOperator} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Value</label>
                                    <input type="number" className="form-control" onChange={(event) => this.handleValueChange(event)} />
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

function mapStateToProps(state, ownProps) {
    return {
        groups: state.groups
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getGroups: () => dispatch(groupsActions.getAllGroups()),
        createDevice: (device) => dispatch(devicesActions.postDevice(device))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRule);