import React, { Component } from 'react';
import { CreateRule } from '../createRule';
import { connect } from 'react-redux';
import { Loader, Header, Alert } from '../shared';
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
        return ([
            <Header key="header" title="Rules" button="New rule" showAddSection={this.openCreateRuleSection} />,
            <div key="content" className="content">
                <div className="row">
                    <div className={this.state.showCreateRule ? "col-md-8" : "col-md-12"}>
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Your rules</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    {this.props.isFetching ?
                                        <Loader isFetching={this.props.isFetching}></Loader>
                                        :
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
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showCreateRule && <CreateRule close={this.closeCreateRuleSection} />}
                </div>
            </div>,
            <Alert key="alert" message={this.props.error}/>
        ]);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        rules: state.rules,
        error: state.errorMessage,
        isFetching: state.loading
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getRules: dispatch(rulesActions.getAllRules())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Rules);