import * as React from 'react';
import { Link } from 'react-router-dom';
import ContentTree from '../ContentTree';

interface ITreeNodeProps {
    childNodes: ContentTree[];
    className?: string;
}

export default class TreeNode extends React.Component<ITreeNodeProps, {}> {  
    constructor(props: ITreeNodeProps) {
        super(props);
    }
    
    render(): JSX.Element[] {
        const { childNodes, className } = this.props;

        if (childNodes && childNodes.length) {            
            return childNodes.map(node => (
                <ul key={node.name} className={`nav-item ${className}`}>
                    <Link className="nav-link" to={`/${node.urlPath}`}>{node.name}</Link>
                    {(node.children && node.children.length)
                        ? (
                            <TreeNode childNodes={node.children} className="pl-3"/>
                        )
                        : null}
                </ul>
            ));
        }
        return;
    }
}