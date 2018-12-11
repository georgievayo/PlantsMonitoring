import React from 'react';
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

export const RulesCard = ({ count, icon, title, color }) => {
    return (
        <Card className="card-stats">
            <CardBody>
                <Row>
                    <Col xs={5} md={4}>
                        <div className="icon-big text-center">
                            <i className={`now-ui-icons ${icon} ${color}`} />
                        </div>
                    </Col>
                    <Col xs={7} md={8}>
                        <div className="numbers">
                            <p className={`card-category ${color}`}>{title}</p>
                            <CardTitle tag="p">{count}</CardTitle>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}