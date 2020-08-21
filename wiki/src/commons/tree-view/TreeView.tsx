import * as React from 'react';
import { IContentTree } from '../types/ContentTree';
import TreeNode from './TreeNode';
import * as _ from 'lodash';

interface ITreeViewProps {
  contentTree: IContentTree
}

const TreeView = (props: ITreeViewProps) => {
  const { contentTree } = props;

  const mapToTreeNodes = (contentTree: IContentTree): JSX.Element[] => {
    const nodes = _.cloneDeep(contentTree.children);

    const homeIndex = nodes.findIndex(x => x.name.match(/\bhome\b/i))
    const linksIndex = nodes.findIndex(x => x.name.match(/\blinks\b/i))

    const homeNode = homeIndex !== -1 ? nodes.splice(homeIndex, 1)[0] : null;
    const linksNode = linksIndex !== -1 ? nodes.splice(linksIndex, 1)[0] : null;

    // Add home to beginning, links to end of tree
    nodes.unshift(homeNode);
    nodes.push(linksNode);

    return nodes.map(node => (
      node
        ? <TreeNode key={node.name} node={node} className="pl-0"/>
        : null
    ));
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