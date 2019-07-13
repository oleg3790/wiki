import * as React from 'react';
import '../../styles/TreeView.scss';
import { Link } from 'react-router-dom';
import ContentTree from '../ContentTree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface ITreeNodeProps {
    node: ContentTree;
    className?: string;
}

interface ITreeNodeState {
    collapsed: boolean
}

export default class TreeNode extends React.Component<ITreeNodeProps, ITreeNodeState> {  
    constructor(props: ITreeNodeProps) {
        super(props);

        this.state = {
            collapsed: false
        }
    }

    private _handleCollapseToggle = (e: React.MouseEvent) => {
        this.setState({ collapsed: !this.state.collapsed });
    }
    
    render(): JSX.Element {
        const { node, className } = this.props;
        const { collapsed } = this.state;

        if (node) {            
            return (
                <ul key={node.name} className={`nav-item ${className}`}>
                    <div className="row no-gutters pt-1 pb-1">
                        <span className="col-1 text-center" onClick={this._handleCollapseToggle}>
                        {(node.children && node.children.length) 
                            ? <FontAwesomeIcon icon={collapsed ? faPlus : faMinus} size="sm"/>
                            : null}
                        </span>
                        <Link className="col-11 nav-link pt-0 pb-1" to={`/${node.urlPath}`}>{node.name}</Link>
                    </div>
                    
                    {(node.children && node.children.length)
                        ? this.recurseChildren(node.children)
                        : null}
                </ul>
            );
        }
        return null;
    }

    recurseChildren = (childrenNodes: ContentTree[]) => {
        return childrenNodes.map(node => <TreeNode node={node} className={`pl-4 ${this.state.collapsed && "tv-collapsed"}`}/>)
    }
}