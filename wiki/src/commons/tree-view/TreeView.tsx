import * as React from 'react';
import { IContentTree } from '../types/ContentTree';
import TreeNode from './TreeNode';

interface ITreeViewProps {
  contentTree: IContentTree
}

const TreeView = (props: ITreeViewProps) => {
  const { contentTree } = props;

  const mapToTreeNodes = (contentTree: IContentTree): JSX.Element[] => {
    return contentTree.children.map(node => {
      return <TreeNode key={node.name} node={node} className="pl-0"/>;
    });
  }

  return (
    <div>
      {(contentTree && contentTree.children && contentTree.children.length)
        ? mapToTreeNodes(contentTree)
        : null
      }
    </div>
  );
};

export default TreeView;