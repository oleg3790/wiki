import * as React from 'react';
import ContentTree from '../ContentTree';
import TreeNode from './TreeNode';

interface ITreeViewProps {
    contentTree: ContentTree
}

const TreeView = (props: ITreeViewProps) => {
    const { contentTree } = props;

    const mapToTreeNodes = (contentTree: ContentTree): JSX.Element[] => {
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