import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationCard from './NavigationCard';
 
export default function Layout(props: any) {
    return (
        <Container fluid={true}>
            <Row id="main-banner">
                <Col xl={{ span: 3 }} className="p-2 pl-5">
                    <h1 id="main-title">Oleg Krysko's Tech Wiki</h1>
                </Col>
            </Row>
            <Row>
                <Col xl="3">
                    <NavigationCard className="mt-3"/>
                </Col>
                <Col xl="9" className="mt-3 pt-3">
                    {props.children}
                </Col>
            </Row>            
        </Container>
    );
}