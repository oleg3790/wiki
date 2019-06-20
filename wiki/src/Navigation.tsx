import React from 'react';
import { Link } from 'react-router-dom';

interface INavigationProps {
    navTree: object|null;
}

const Navigation = (props: INavigationProps): JSX.Element => {    
    const _buildLinks = (navTree: object, initialLinks: JSX.Element[]): JSX.Element[] =>  {
        Object.entries(navTree).forEach(([key, value]) => {
            if (typeof value === 'string') {
                return;
            }
            initialLinks.push(<li key={key} className="nav-item"><Link className="nav-link" to={`/${value.UrlPath ? value.UrlPath : "error"}`}>{key}</Link></li>)
            return _buildLinks(value, initialLinks);
        });
        return initialLinks;
    };
    
    return (
        <div id="navigation">
            <ul className="nav flex-column">
                {props.navTree && _buildLinks(props.navTree, [])}
            </ul>
        </div>
    );
} 

export default Navigation;