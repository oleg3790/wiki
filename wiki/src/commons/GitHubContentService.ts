import Octokit from '@octokit/rest';
import ContentNode from './ContentNode';
import { node } from 'prop-types';

export default class GitHubContentService {
    private readonly _octokit: Octokit;
    private _owner = 'oleg3790';
    private _repo = 'wiki';

    constructor() {
        this._octokit = new Octokit({
            auth: '80521623c6d28b90ca099ffc4d075d908c62a685',
            userAgent: 'okryskowiki',
            baseUrl: 'https://api.github.com',
        })
    }

    /**
     * Gets an object that models the site-content branch's content
     */
    public async getSiteContentTree(): Promise<object|null> {
        const nodes = await this._getContentNodes('wiki', 0, []);
        return nodes.length > 0 ? this._buildContentTree(nodes) : null;
    }

    /**
     * Recursively gets all content nodes based off of each resource node in the site-content branch 
     * @param pathNode Branch resource path
     * @param contentCounter Used to remember count state during recursion
     * @param tmpResultObj Object used to hold the result during the build
     */
    private async _getContentNodes(pathNode: string, contentCounter: number, tmpResultObj: ContentNode[]): Promise<ContentNode[]> {
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
                        return await this._getContentNodes(encodedUri, i + 1, tmpResultObj);
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

    private _buildContentTree(nodes: ContentNode[]): object {
        let contentTree: any = {};

        // We only care about files as they will contain all directories in the path anyway
        nodes
            .filter(n => n.Type === 'file')
            .forEach(n => {
                const levels = n.Path.split('/');
                let indexFile = levels.pop();
                
                if (indexFile && indexFile.match(/index\.md/i)) {
                    levels.reduce((prev, lvl, i) => {
                        return prev[lvl] = (levels.length - i - 1) 
                                ? prev[lvl] || {} 
                                : (prev[lvl] || []).concat(n.DownloadUrl);                 
                    }, contentTree);
                }
        });        
        return contentTree;
    }
}
