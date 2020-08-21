import React from 'react';
import TreeView from './components/tree-view/TreeView';
import { IContentTreeNode } from './models/ContentTreeNode';

interface INavigationProps {
  contentTree: IContentTreeNode;
}

const Navigation = (props: INavigationProps): JSX.Element => {
  return (
    <div id="navigation">
      <ul className="nav flex-column">
        <TreeView contentTree={props.contentTree}/>
      </ul>
    </div>
  );
}

export default Navigation;