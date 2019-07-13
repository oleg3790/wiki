import * as React from 'react';
import ContentTree from '../ContentTree';
import TreeNode from './TreeNode';


interface ITreeViewProps {
    contentTree: ContentTree
}

export default class TreeView extends React.Component<ITreeViewProps, {}> {
    render() {
        const { contentTree } = this.props;

        return (
            <div>
                {(contentTree && contentTree.children && contentTree.children.length)
                    ? this.mapToTreeNodes(contentTree)
                    : null
                }
            </div>
        );
    }

    mapToTreeNodes = (contentTree: ContentTree): JSX.Element[] => {
        return contentTree.children.map(node => {
            return <TreeNode node={node} className="pl-0"/>;
        });
    }
}