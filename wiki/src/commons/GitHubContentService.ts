import Octokit from '@octokit/rest';
import ContentNode from './ContentNode';
import ContentTree from './ContentTree';

export default class GitHubContentService {
    private readonly _octokit: Octokit;
    private _owner = 'oleg3790';
    private _repo = 'wiki';

    constructor() {
        this._octokit = new Octokit({
            auth: '',
            userAgent: 'wiki',
            baseUrl: 'https://api.github.com',
        })
    }

    /**
     * Gets an object that models the site-content branch's content
     */
    public async getSiteContentTree(): Promise<ContentTree> {
        const nodes = await this._getContentNodes('wiki', 0, []);
        return nodes.length > 0 ? this._buildContentTree(nodes) : null;
    }

    /**
     * Recursively gets all content nodes based off of each resource node in the site-content branch 
     * @param pathNode Branch resource path
     * @param contentCounter Used to remember count state during recursion
     * @param tmpResultObj Object used to hold the result during the build
     */
    private async _getContentNodes(pathNode: string, contentCounter: number, initialContenNodes: ContentNode[]): Promise<ContentNode[]> {
        try {
            const response = await this._octokit.repos.getContents({ 
                owner: this._owner,
                repo: this._repo,
                path: `${pathNode}?ref=site-content`
            });

            if (response.status === 200) {
                let tmpWorkItems: any[] = [];
                let exit = false;
                // Check if response data is array or object as response data is object when there is no other dir nodes under the content
                if (Array.isArray(response.data)) {
                    tmpWorkItems = response.data;
                } else if (typeof response.data === 'object') {
                    tmpWorkItems.push(response.data);
                }

                tmpWorkItems.forEach(workItem => {
                    const contentNode = new ContentNode(workItem)
                    // Recusion exit condition: dont add existing nodes to collection
                    if (this._contentNodeExists(initialContenNodes, contentNode)) {
                        exit = true;
                        return;
                    }
                    initialContenNodes.push(new ContentNode(workItem));                    
                });

                if (exit) {
                    return initialContenNodes;
                }

                for (let i = contentCounter; i < initialContenNodes.length; i++) {
                    if (initialContenNodes[i].Type !== 'file') {
                        const encodedUri = encodeURIComponent(initialContenNodes[i].Path);
                        return await this._getContentNodes(encodedUri, i + 1, initialContenNodes);
                    }
                }         
            } else {
                console.log(`GitHub API responded with ${response.status} with ${response.data.length} data elements`);
            }
            return initialContenNodes;
        } catch (ex) {
            console.log(`GitHubContentService.doGetContents Error - ${ex.message}`);
            return [];
        }
    }

    private _buildContentTree(nodes: ContentNode[]): ContentTree {
        let contentTree: ContentTree = new ContentTree();

        nodes
            .filter(n => n.Type === 'file')
            .forEach(n => {
                const pathLevels = n.Path.split('/');
                let indexFile = pathLevels.pop();
                
                if (indexFile && indexFile.match(/index\.md/i)) {
                    pathLevels.reduce((prev, path, i) => {                      
                        if (pathLevels.length - i - 1) {
                            if (prev.children && prev.children.length) {
                                return (prev.children as Array<any>).find(c => c.name === path) || prev;
                            }

                            prev.name = prev.name || path;
                            prev.children = prev.children || [];                            
                        } else {
                            prev.children.push({ name: path, children: [], downloadUrl: n.DownloadUrl, urlPath: this._toUrlSafePath(path) });
                        }
                        return prev; 
                    }, contentTree);
                }
        });        
        return contentTree;
    }

    /**
     * Check if node exists in contentNodes
     * @param contentNodes 
     * @param node 
     */
    private _contentNodeExists(contentNodes: ContentNode[], node: ContentNode) {
        return contentNodes.filter(n => n.Path === node.Path).length > 0;
    }

    private _toUrlSafePath(pathElement: string): string {
        const regexReplacements = [
            {from: /c#/g, to: 'c-sharp'},
            {from: /\.+/g, to: 'dot'},
            {from: /\s{2,}/g, to: ' '},
            {from: /[\s/\\]+/g, to: '-'},
            {from: /[()+~=!@#$%^&*{}?]+/g, to: ''},
        ];

        regexReplacements.forEach(r => {
            pathElement = pathElement.toLowerCase().replace(r.from, r.to);
        })
        return pathElement;
    }
}
