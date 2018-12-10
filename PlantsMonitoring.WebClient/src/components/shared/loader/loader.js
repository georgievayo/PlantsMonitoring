import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { BeatLoader } from 'react-spinners';

class Loader extends Component {
    render() {
        return (
            <Row>
                <Col md={{ size: 'auto' }}>
                    <BeatLoader
                        sizeUnit={"px"}
                        size={15}
                        color={'#183659'}
                        loading={this.props.isFetching}
                    />
                </Col>
            </Row>
        )
    }
}

export default Loader;