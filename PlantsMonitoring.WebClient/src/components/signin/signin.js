import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as usersActions from '../../actions/users.actions';

class Signin extends Component {
    state = {
        username: '',
        password: ''
    }

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    submit = (event) => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.signIn(user)
            .then(() => this.props.history.push('/dashboard'));
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup className="center">
                                <Card className="p-4">
                                    <CardBody>
                                        <Form onSubmit={this.submit}>
                                            <h1>Login</h1>
                                            <p className="text-muted">Sign In to your account</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons users_single-02"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Username" autoComplete="username" onChange={this.handleUsernameChange} />
                                            </InputGroup>
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password" autoComplete="current-password" onChange={this.handlePasswordChange} />
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button className="px-4" style={{backgroundColor: '#F96332', borderColor: '#F96332'}}>Sign In</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white py-5 d-md-down-none" style={{ width: '44%', background: '#183659' }}>
                                    <CardBody className="text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                                            <Link to="/signup">
                                                <Button className="mt-3" style={{backgroundColor: '#F96332', borderColor: '#F96332'}} active tabIndex={-1}>Sign Up Now!</Button>
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        signIn: (user) => dispatch(usersActions.signIn(user))
    };
}


export default connect(null, mapDispatchToProps)(Signin);