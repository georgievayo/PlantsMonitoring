import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import * as usersActions from '../../actions/users.actions';
import SimpleReactValidator from 'simple-react-validator';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.validator = new SimpleReactValidator({
            className: 'text-danger login-error'
        });
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

        if (this.validator.allValid()) {
            this.props.signIn(user)
                .then(() => this.props.history.push('/dashboard'));
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
                                            {this.validator.message('username', this.state.username, 'required')}
                                            <InputGroup className="mb-4">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="password" placeholder="Password" autoComplete="current-password" onChange={this.handlePasswordChange} />
                                            </InputGroup>
                                            {this.validator.message('password', this.state.password, 'required')}
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
                                            <p>Plants Monitoring is a real time system to monitor temperature, light exposure and soil moisture of your plants. If you do not have a user account yet, you can sign up for free.</p>
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