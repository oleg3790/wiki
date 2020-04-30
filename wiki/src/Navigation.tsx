import React from 'react';
import TreeView from './commons/tree-view/TreeView';
import ContentTree from './commons/ContentTree';

interface INavigationProps {
  contentTree: ContentTree;
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