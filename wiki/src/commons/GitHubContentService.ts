import Octokit from '@octokit/rest';

interface IGitHubContentService {
    getSiteContents: () => {};
}

export default class GitHubContentService {
    private _octokit: Octokit;

    constructor() {
        this._octokit = new Octokit({
            userAgent: 'okryskowiki',
            baseUrl: 'https://api.github.com',
        })
    }

    async getSiteContents() {
        return await this._octokit.repos.getContents({ 
            owner: 'oleg3790',
            repo: 'wiki',
            path: 'wiki?ref=site-content'
        });
    }

}
