export interface IContentTreeNode {
  name: string;
  downloadUrl: string;
  urlPath: string;
  children: IContentTreeNode[];
}
