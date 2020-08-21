import React from 'react';
import TreeView from './commons/tree-view/TreeView';
import { IContentTree } from './commons/types/ContentTree';

interface INavigationProps {
  contentTree: IContentTree;
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