export interface IContentTree {
  name: string;
  downloadUrl: string;
  urlPath: string;
  children: IContentTree[];
}
