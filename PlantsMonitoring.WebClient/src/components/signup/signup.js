import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as usersActions from '../../actions/users.actions';

class Signup extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        passwordRepeated: ''
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

        this.props.signUp(user)
            .then(() => this.props.history.push('/signin'));
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
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_email-85"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="email" placeholder="Email" autoComplete="email" onChange={this.handleEmailChange} />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" autoComplete="new-password" onChange={this.handlePasswordChange} />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Repeat password" autoComplete="new-password" onChange={this.handlePasswordRepeatedChange} />
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