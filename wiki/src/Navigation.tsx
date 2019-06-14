import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
        <div id="navigation">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/dot-net-technologies" className="nav-link">.NET Technologies</Link>
                </li>
            </ul>
        </div>
    );
} 

export default Navigation;