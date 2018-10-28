import React, { Component } from 'react';
import { CreateRule } from '../createRule';
import { connect } from 'react-redux';
import * as rulesActions from '../../actions/rules.actions';

class Rules extends Component {
    state = {
        showCreateRule: false
    };

    openCreateRuleSection = () => {
        this.setState({ showCreateRule: true });
    }

    closeCreateRuleSection = () => {
        this.setState({ showCreateRule: false });
    }

    render() {
        return (
            [<nav key="nav" className="navbar navbar-expand-lg fixed-top navbar-transparent  bg-primary  navbar-absolute">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button type="button" className="navbar-toggler">
                                <span className="navbar-toggler-bar bar1"></span>
                                <span className="navbar-toggler-bar bar2"></span>
                                <span className="navbar-toggler-bar bar3"></span>
                            </button>
                        </div>
                        <a className="navbar-brand" href="#pablo">Rules</a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                        <span className="navbar-toggler-bar navbar-kebab"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="nav-link" id="new-device-btn" onClick={this.openCreateRuleSection}>
                                    <i className="now-ui-icons ui-1_simple-add"></i>
                                    New Rule
                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>,
            <div key="panel-header" className="panel-header panel-header-sm">
            </div>,
            <div key="content" className="content">
                <div className="row">
                    <div className={this.state.showCreateRule ? "col-md-8" : "col-md-12"}>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Your rules</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr className="text-primary">
                                                <th>
                                                    Name
                      </th>
                                                <th>
                                                    Description
                      </th>
                                                <th>
                                                    Importance
                      </th>
                                                <th>
                                                    Rule For
                      </th>
                                                <th className="text-right">
                                                    Plant Type
                      </th>
                                            </tr>
                                            {this.props.rules.map(rule =>
                                                <tr key={rule.name}>
                                                    <td>
                                                        {rule.name}
                                                    </td>
                                                    <td>
                                                        {rule.description}
                                                    </td>
                                                    <td>
                                                        {rule.type}
                                                    </td>
                                                    <td>
                                                        {rule.field}
                                                    </td>
                                                    <td className="text-right">
                                                        {rule.group}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showCreateRule && <CreateRule close={this.closeCreateRuleSection} />}
                </div>
            </div>]
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        rules: state.rules
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getRules: dispatch(rulesActions.getAllRules())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Rules);