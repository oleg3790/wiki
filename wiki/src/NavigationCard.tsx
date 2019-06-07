import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

interface INavigationCard {
    className?: string;
}

const NavigationCard: React.FC<INavigationCard> = (props: INavigationCard) => {
    return (
        <Card className={props.className}>
            <Card.Body>
                <Card.Title as="h3">Topics</Card.Title>
                <hr/>
            </Card.Body>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </Card>
    );
} 

export default NavigationCard;