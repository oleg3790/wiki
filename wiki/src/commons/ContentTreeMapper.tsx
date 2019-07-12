import React from 'react';
import { Route } from "react-router";
import NodeDetails from "./NodeDetails";
import { Link } from 'react-router-dom';

/**
 * Recursively maps routes, using the content tree
 * @param content 
 * @param initialRoutes Any initial routes to be passed 
 */
export const mapRoutes = (contentTree: any, initialRoutes: JSX.Element[] = []): JSX.Element[] => {
    (contentTree.children as Array<any>).forEach(node => {
        if (node.DownloadUrl && node.UrlPath) {
            initialRoutes.push(
                <Route key={node.UrlPath} path={`/${node.UrlPath}`} 
                       render={(routeProps) => <NodeDetails {...routeProps} contentUrl={node.DownloadUrl}/>}/>);
        }        
        return mapRoutes(node, initialRoutes);
    });
    return initialRoutes;
}

/**
 * Builds the route links, using the contentTree passed
 * @param contentTree 
 * @param initialLinks 
 */
export const getRouteLinks = (contentTree: any): JSX.Element =>  {
    let visualTree = <ul></ul>;
    (contentTree.children as Array<any>).forEach(node => {
        let visualParent = <ul></ul>;
        if (node.children && node.children.length) {
            return getRouteLinks(node);
        } else {
            visualTree = React.cloneElement(visualTree, { children: visualParent });
            return;
        }
        
    });
    return visualTree;

    /*
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
    */
};