import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as usersActions from '../../actions/users.actions';
import SimpleReactValidator from 'simple-react-validator';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordRepeated: '',
        };
        this.validator = new SimpleReactValidator({
            className: 'text-danger',
            validators: {
                password: {
                    message: 'The :attribute field must contain at least 8 characters, 1 number, 1 uppercase and 1 lowercase.',
                    rule: (val, params, validator) => {
                        return validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/) && params.indexOf(val) === -1;
                    }
                },
                match: {
                    message: 'The passwords must match.',
                    rule: (val, params, validator) => {
                        return this.state.password === val;
                    }
                }
            }
        });
    }

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    handlePasswordRepeatedChange = (event) => {
        this.setState({passwordRepeated: event.target.value});
    }

    submit = (event) => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        if (this.validator.allValid()) {
            this.props.signUp(user)
                .then(() => this.props.history.push('/signin'));
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form onSubmit={this.submit}>
                                        <h1>Register</h1>
                                        <p className="text-muted">Create your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons users_single-02"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" autoComplete="username" onChange={this.handleUsernameChange} />
                                            {this.validator.message('username', this.state.username, 'required|min:3')}
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_email-85"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="email" placeholder="Email" autoComplete="email" onChange={this.handleEmailChange} />
                                            {this.validator.message('email', this.state.email, 'required|email')}
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" autoComplete="new-password" onChange={this.handlePasswordChange} />
                                            {this.validator.message('password', this.state.password, 'required|password')}
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Repeat password" autoComplete="new-password" onChange={this.handlePasswordRepeatedChange} />
                                            {this.validator.message('repeat password', this.state.passwordRepeated, 'required|match')}
                                        </InputGroup>
                                        <Button style={{backgroundColor: '#F96332', borderColor: '#F96332'}} block>Create Account</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        signUp: (user) => dispatch(usersActions.signUp(user))
    };
}


export default connect(null, mapDispatchToProps)(Signup);