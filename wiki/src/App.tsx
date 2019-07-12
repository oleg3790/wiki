import React from 'react';
import './styles/App.scss';
import { HashRouter, Route } from 'react-router-dom';
import Layout from './Layout';
import GitHubContentService from './commons/GitHubContentService';
import { IContentTree } from './commons/ContentTree';
import NodeDetails from './commons/NodeDetails';

interface IAppState {
    contentTree: IContentTree;
}

export default class App extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            contentTree: null
        }
    }

    async componentDidMount() {
        const ghContentService = new GitHubContentService();
        const tree = await ghContentService.getSiteContentTree();
        this.setState({ contentTree: tree });
    }

    /**
     * Recursively maps routes, using the content tree
     * @param content 
     * @param initialRoutes Any initial routes to be passed 
     */
    mapRoutes = (contentTree: IContentTree, initialRoutes: JSX.Element[] = []): JSX.Element[] => {
        contentTree.children.forEach(node => {
            if (node.downloadUrl && node.urlPath) {
                initialRoutes.push(
                    <Route key={node.urlPath} path={`/${node.urlPath}`} 
                        render={(routeProps) => <NodeDetails {...routeProps} contentUrl={node.downloadUrl}/>}/>);
            }        
            return this.mapRoutes(node, initialRoutes);
        });
        return initialRoutes;
    }

    render() {
        const { contentTree } = this.state;
        return (
            <HashRouter basename="/">
                <Layout contentTree={contentTree}>
                    <div>
                        {contentTree && this.mapRoutes(contentTree)}
                    </div>
                </Layout>
            </HashRouter>
        );
    }
}