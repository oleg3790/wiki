import React from 'react';
import './styles/App.scss';
import { Route, HashRouter } from 'react-router-dom';
import Layout from './Layout';
import GitHubContentService from './commons/GitHubContentService';
import NodeDetails from './commons/NodeDetails';

interface IAppState {
    content: object|null;
}

export default class App extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            content: null
        }
    }

    async componentDidMount() {
        const ghContentService = new GitHubContentService();
        const tree = await ghContentService.getSiteContentTree();
        this.setState({ content: tree });
    }

    render() {
        const { content } = this.state;
        return (
            <HashRouter basename="/">
                <Layout navTree={content}>
                    <div>
                        {content && this._getRoutes(content, [])}
                    </div>
                </Layout>
            </HashRouter>
        );
    }

    private _getRoutes = (content: object, initialRoutes: JSX.Element[]): JSX.Element[] => {
        Object.entries(content).forEach(([key, value]) => {
            if (typeof value === 'string') {
                return initialRoutes;
            }
            initialRoutes.push(
                <Route key={key} path={`/${value.UrlPath ? value.UrlPath : "error"}`} 
                       render={(routeProps) => <NodeDetails {...routeProps} contentUrl={value.DownloadUrl ? value.DownloadUrl : null}/>}/>);
            return this._getRoutes(value, initialRoutes);
        });
        return initialRoutes;
    }
}
