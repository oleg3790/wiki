import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationCard from './NavigationCard';
import title from './images/title.png';
import logo from './images/logo.png';
 
export default function Layout(props: any) {
    return (
        <Container fluid={true}>
            <Row id="main-banner">
                <Col xl={{ span: 6 }} className="p-1 pl-5">
                    <img id="main-logo" src={logo} width="50px" height="50px" alt="logo"/>
                    <h3 id="main-title" className="d-inline-block">Technological Wiki</h3>
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