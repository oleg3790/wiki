import React from 'react';
import { getRouteLinks } from './commons/ContentTreeMapper';

interface INavigationProps {
    contentTree: object|null;
}

const Navigation = (props: INavigationProps): JSX.Element => {    

    
    return (
        <div id="navigation">
            <ul className="nav flex-column">
                {props.contentTree && getRouteLinks(props.contentTree)}
            </ul>
        </div>
    );
} 

export default Navigation;