export interface IContentTree {
  name: string,
  downloadUrl: string,
  urlPath: string,
  children: IContentTree[]
}

export default class ContentTree implements IContentTree {
  public name: string = null;
  public downloadUrl: string = null;
  public urlPath: string = null;
  public children: IContentTree[] = [];
}