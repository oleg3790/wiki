import React from 'react';
import { Route } from "react-router";
import NodeDetails from "./NodeDetails";
import { Link } from 'react-router-dom';

/**
 * Recursively maps routes, using the content tree
 * @param content 
 * @param initialRoutes Any initial routes to be passed 
 */
export const mapRoutes = (contentTree: object, initialRoutes: JSX.Element[] = []): JSX.Element[] => {
    Object.entries(contentTree).forEach(([key, value]) => {
        if (typeof value === 'string') {
            return initialRoutes;
        }
        initialRoutes.push(
            <Route key={key} path={`/${value.UrlPath ? value.UrlPath : "error"}`} 
                   render={(routeProps) => <NodeDetails {...routeProps} contentUrl={value.DownloadUrl ? value.DownloadUrl : null}/>}/>);
        return mapRoutes(value, initialRoutes);
    });
    return initialRoutes;
}

/**
 * Builds the route links, using the contentTree passed
 * @param contentTree 
 * @param initialLinks 
 */
export const getRouteLinks = (contentTree: object, initialLinks: JSX.Element[] = []): JSX.Element[] =>  {
    Object.entries(contentTree).forEach(([key, value]) => {
        if (typeof value === 'string') {
            return;
        }
        if (value.UrlPath) {
            initialLinks.push(<li key={key} className="nav-item"><Link className="nav-link" to={`/${value.UrlPath}`}>{key}</Link></li>)
        }
        return getRouteLinks(value, initialLinks);
    });
    return initialLinks;
};