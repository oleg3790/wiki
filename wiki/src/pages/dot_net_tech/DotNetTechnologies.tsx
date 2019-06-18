import React from 'react';
import GitHubContentService from '../../commons/GitHubContentService';
import ContentNode from '../../commons/ContentNode';

class DotNetTechnologies extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            result: null
        }
    }

    async componentDidMount() {
        const service = new GitHubContentService()
        const result = await service.getSiteContentTree();
        this.setState({ result: result });
    }

    render() {
        return (
            <ul>
                {/*this.state.result 
                    ? this.state.result.map((x: ContentNode) => <li>{x.Type} - {x.Path} - {x.DownloadUrl}</li>)
                : null*/}
            </ul>);
    }
}

export default DotNetTechnologies;