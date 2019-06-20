import React from 'react';
import './styles/App.scss';
import { HashRouter } from 'react-router-dom';
import Layout from './Layout';
import GitHubContentService from './commons/GitHubContentService';
import { mapRoutes } from './commons/ContentTreeMapper';

interface IAppState {
    contentTree: object|null;
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

    render() {
        const { contentTree } = this.state;
        return (
            <HashRouter basename="/">
                <Layout contentTree={contentTree}>
                    <div>
                        {contentTree && mapRoutes(contentTree)}
                    </div>
                </Layout>
            </HashRouter>
        );
    }
}
