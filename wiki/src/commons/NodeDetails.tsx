import React from 'react';
import ReactMarkdown from 'react-markdown';

interface INodeDetailProps {
    contentUrl: string|null;
}

interface INodeDetailState {
    content: string|null;
}

export default class NodeDetails extends React.Component<INodeDetailProps, INodeDetailState> {
    constructor(props: INodeDetailProps) {
        super(props);
        this.state = {
            content: null
        }
    }

    async componentDidMount() {
        if (this.props.contentUrl) {
            const response = await fetch(this.props.contentUrl);
            this.setState({ content: await response.text() });
        }
    }

    render() {
        return (
            <div>
                {this.state.content && <ReactMarkdown source={this.state.content as string}/>}
            </div>
        );
    }
}