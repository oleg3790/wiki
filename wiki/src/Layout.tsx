import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
 
export default function Layout(props: any) {
    return (
        <Container fluid={true}>
            <Row>
                <Col id="main-banner"></Col>
            </Row>
            {props.children}
        </Container>
    );
}