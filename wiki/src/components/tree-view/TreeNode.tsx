import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { IContentTreeNode } from '../../models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getNavNodeCollapsedState, cacheNavNodeCollapsedState } from '../../services/LocalCacheService';

interface ITreeNodeProps {
  node: IContentTreeNode;
  className?: string;
}

interface ITreeNodeState {
  collapsed: boolean
}

export default class TreeNode extends React.Component<ITreeNodeProps, ITreeNodeState> {
  constructor(props: ITreeNodeProps) {
    super(props);

    this.state = {
      collapsed: true
    }
  }

  componentDidMount() {
    const cachedState: boolean | null = getNavNodeCollapsedState(this.props.node.name);
    this.setState({ collapsed: cachedState === null ? this.state.collapsed : cachedState });
  }

  handleCollapseToggle = (e: React.MouseEvent) => {
    cacheNavNodeCollapsedState(this.props.node.name, !this.state.collapsed);
    this.setState({ collapsed: !this.state.collapsed });
  }

  render(): JSX.Element {
    const { node, className } = this.props;
    const { collapsed } = this.state;

    if (node) {
      return (
        <ul key={node.name} className={`nav-item disable-selection ${className}`}>
          <div className="row no-gutters pt-1 pb-1">
            <span className="col-1 text-center pointer" onClick={this.handleCollapseToggle}>
            {(node.children && node.children.length)
              ? <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronDown} size="sm"/>
              : null}
            </span>
            <NavLink className="col-11 nav-link pt-0 pb-1" activeClassName="selected-nav-link" to={`/${node.urlPath}`}>{node.name}</NavLink>
          </div>

          {(node.children && node.children.length)
            ? this.recurseChildren(node.children)
            : null}
        </ul>
      );
    }
    return null;
  }

  recurseChildren = (childrenNodes: IContentTreeNode[]) => {
    return childrenNodes.map(node => <TreeNode key={node.name} node={node} className={`pl-4 ${this.state.collapsed && "nav-collapsed"}`}/>)
  }
}