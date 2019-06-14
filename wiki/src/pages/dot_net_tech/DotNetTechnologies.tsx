import React from 'react';
import GitHubContentService from '../../commons/GitHubContentService';

class DotNetTechnologies extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        const service = new GitHubContentService()
        const r = await service.getSiteContents();
    }

    render() {
        return <div></div>;
    }
}

export default DotNetTechnologies;