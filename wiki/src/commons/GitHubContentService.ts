import Octokit from '@octokit/rest';
import ContentNode from './ContentNode';

export default class GitHubContentService {
    private readonly _octokit: Octokit;
    private _owner = 'oleg3790';
    private _repo = 'wiki';

    constructor() {
        this._octokit = new Octokit({
            auth: '0e4526918739e995ff7371a4abf6a5d3c4d833ce',
            userAgent: 'okryskowiki',
            baseUrl: 'https://api.github.com',
        })
    }

    /**
     * Get site content tree
     */
    public async getSiteContents(): Promise<any> {
        return await this._buildContentTree('wiki', 0, []);
    }

    /**
     * Recursively builds a content tree object based off of each resource node in the site-content branch 
     * @param pathNode Branch resource path
     * @param contentCounter Used to remember count state during recursion
     * @param tmpResultObj Object used to hold the result during the build
     */
    private async _buildContentTree(pathNode: string, contentCounter: number, tmpResultObj: ContentNode[]): Promise<ContentNode[]> {
        try {
            const response = await this._octokit.repos.getContents({ 
                owner: this._owner,
                repo: this._repo,
                path: `${pathNode}?ref=site-content`
            });

            if (response.status === 200) {
                if (response.data.length !== undefined && response.data.length > 0) {
                    (response.data as any[]).forEach((node) => tmpResultObj.push(new ContentNode(node)));
                
                    for (let i = contentCounter; i <= tmpResultObj.length; i++) {
                        const encodedUri = encodeURIComponent(tmpResultObj[i].Path);
                        return await this._buildContentTree(encodedUri, i + 1, tmpResultObj);
                    }  
                } else {
                    return tmpResultObj;
                }        
            } else {
                console.log(`GitHub API responded with ${response.status} with ${response.data.length} data elements`);
            }
            return tmpResultObj;
        } catch (ex) {
            console.log(`GitHubContentService.doGetContents Error - ${ex.message}`);
            return [];
        }
    }
}
