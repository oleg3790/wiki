import React from 'react';
import ReactMarkdown from 'react-markdown';
import { IContentTreeNode } from '../models';

interface INodeDetailProps {
  contentNode: IContentTreeNode | null
}

interface INodeDetailState {
  content: string | null;
  pageName: string | null;
}

export default class NodeDetails extends React.Component<INodeDetailProps, INodeDetailState> {
  constructor(props: INodeDetailProps) {
    super(props);
    this.state = {
      content: null,
      pageName: null
    }
  }

  async componentDidMount() {
    const { contentNode } = this.props;

    if (contentNode.downloadUrl) {
      const response = await fetch(contentNode.downloadUrl);
      this.setState({ content: await response.text(), pageName: contentNode.name });
    }
  }

  render() {
    return (
      <div className="nav-details">
        {this.state.content && (
          <div>
            <h1 className="page-title">{this.state.pageName}</h1>
            <hr/>
            <ReactMarkdown source={this.state.content as string} escapeHtml={false}/>
          </div>
        )}
      </div>
    );
  }
}