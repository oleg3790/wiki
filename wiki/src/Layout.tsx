import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
 
export default function Layout(props: any) {
    return (
        <Container fluid={true}>
            <Row id="main-banner">
                <Col xl={{ span: 3, offset: 9 }} className="p-2">
                    <h1 id="main-title">Oleg Krysko's Tech Wiki</h1>
                </Col>
            </Row>
            {props.children}
        </Container>
    );
}