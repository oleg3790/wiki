import * as React from 'react';
import ContentTree from '../ContentTree';
import TreeNode from './TreeNode';


interface ITreeViewProps {
    contentTree: ContentTree
}

export default class TreeView extends React.Component<ITreeViewProps, {}> {
    constructor(props: ITreeViewProps) {
        super(props);
    }

    render() {
        const { contentTree } = this.props;

        return (
            <div>
                {(contentTree && contentTree.children && contentTree.children.length)
                    ? <TreeNode childNodes={contentTree.children} className="pl-0"/>
                    : null
                }
            </div>
        );
    }
}