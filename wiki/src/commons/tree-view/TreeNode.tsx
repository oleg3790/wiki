import * as React from 'react';
import '../../styles/TreeView.scss';
import { Link } from 'react-router-dom';
import ContentTree from '../ContentTree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface ITreeNodeProps {
    childNodes: ContentTree[];
    className?: string;
}

interface ITreeNodeState {
    collapsed: boolean
}

export default class TreeNode extends React.Component<ITreeNodeProps, ITreeNodeState> {  
    constructor(props: ITreeNodeProps) {
        super(props);

        this.state = {
            collapsed: false
        }
    }
    
    render(): JSX.Element[] {
        const { childNodes, className } = this.props;
        const { collapsed } = this.state;

        if (childNodes && childNodes.length) {            
            return childNodes.map(node => (
                <ul key={node.name} className={`nav-item ${className}`}>
                    <div className="row no-gutters pt-1 pb-1">
                        
                        <span className="col-1 text-center">
                        {(node.children && node.children.length) 
                            ? <FontAwesomeIcon icon={collapsed ? faPlus : faMinus} size="sm"/>
                            : null}
                        </span>
                        <Link className="col-11 nav-link pt-0 pb-1" to={`/${node.urlPath}`}>{node.name}</Link>
                    </div>
                    
                    {(node.children && node.children.length)
                        ? <TreeNode childNodes={node.children} className={`pl-4 ${collapsed && "tv-collapsed"}`}/>
                        : null}
                </ul>
            ));
        }
        return;
    }
}