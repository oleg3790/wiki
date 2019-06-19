import React from 'react';
import { Link } from 'react-router-dom';
import GitHubContentService from './commons/GitHubContentService';

interface INavigationState {
    navTree: object|null;
}

export default class Navigation extends React.Component<any,INavigationState> {
    constructor(props: any) {
        super(props);
        this.state = {
            navTree: null
        }
    }

    async componentWillMount() {
        const ghContentService = new GitHubContentService();
        const tree = await ghContentService.getSiteContentTree();
        this.setState({ navTree: tree });
    }
    
    render() {
        return (
            <div id="navigation">
                <ul className="nav flex-column">
                    {this.state.navTree && this.state.navTree}
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
} 