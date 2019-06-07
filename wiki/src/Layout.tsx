import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationCard from './NavigationCard';
import logo from './images/logo.png';
 
export default function Layout(props: any) {
    return (
        <Container fluid={true}>
            <Row id="main-banner">
                <Col xl={{ span: 3 }} className="p-1 pl-5">
                    <img src={logo} width="240px" height="55px"/>
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