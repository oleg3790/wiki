import React from 'react';
import './styles/App.scss';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import Layout from './Layout';
import GitHubContentService from './services/GitHubContentService';
import { IContentTreeNode } from './models';
import NodeDetails from './components/NodeDetails';

interface IAppState {
  contentTree: IContentTreeNode;
  isError: boolean;
  isBusy: boolean;
}

export default class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      contentTree: null,
      isError: false,
      isBusy: false,
    }
  }

  async componentDidMount() {
    this.toggleIsBusy();

    try {
      let ghAuth = localStorage.getItem('auth') || '';

      if (!ghAuth) {
        const authResponse = await fetch('http://olegkrysko-wiki-auth.azurewebsites.net/api/key', {
          method: 'GET',
          headers: {
            'Request-Item': 'ghKey',
            'Content-Type': 'text/plain'
          }
        });

        if (authResponse.status == 200) {
          ghAuth = await authResponse.text();
          localStorage.setItem('auth', ghAuth);
          console.debug('auth retrieved successfully');
        } else {
          console.log('Could not get auth for gh repo, requests to GH API will be limited');
        }
      }

      const ghContentService = new GitHubContentService(ghAuth);
      const tree = await ghContentService.getSiteContentTree();

      if (tree == null) {
        throw 'No tree content could be loaded';
      }

      this.setState({ contentTree: tree });
    } catch {
      this.setState({ isError: true });
    }

    this.toggleIsBusy();
  }

  toggleIsBusy = () => {
    this.setState({ isBusy: !this.state.isBusy });
  }

  /**
   * Recursively maps routes, using the content tree
   * @param content
   * @param initialRoutes Any initial routes to be passed
   */
  mapRoutes = (contentTree: IContentTreeNode, initialRoutes: JSX.Element[] = []): JSX.Element[] => {
    contentTree.children.forEach(node => {
      if (node.downloadUrl && node.urlPath) {
        initialRoutes.push(
          <Route key={node.urlPath} path={`/${node.urlPath}`}
            render={(routeProps) => <NodeDetails {...routeProps} contentNode={node}/>}/>);
      }

      if (node.name.match(/home/i)) {
        initialRoutes.unshift(<Route key="//home//" path="/"><Redirect to={node.urlPath}/></Route>)
      }

      return this.mapRoutes(node, initialRoutes);
    });
    return initialRoutes;
  }

  render() {
    const { contentTree, isBusy, isError } = this.state;
    return (
      <HashRouter basename="/">
        <Layout contentTree={contentTree} isBusy={isBusy}>
          <div>
            {isError
              ? <h6 className="text-danger">Could not load content, try again later</h6>
              : (contentTree && this.mapRoutes(contentTree))}
          </div>
        </Layout>
      </HashRouter>
    );
  }
}
