export interface IContentNodeLinks {
  Git: string;
  HTML: string;
  Self: string;
}

export interface IContentNode {
  DownloadUrl: string;
  GitUrl: string;
  HTMLUrl: string;
  Name: string;
  Path: string;
  SHA: string;
  Size: number;
  Type: string;
  URL: string;
  Links: IContentNodeLinks;
}

/**
 * Provides strong type and resolver for GitHub API data
 */
export class ContentNode implements IContentNode {
  public readonly DownloadUrl: string;
  public readonly GitUrl: string;
  public readonly HTMLUrl: string;
  public readonly Name: string;
  public readonly Path: string;
  public readonly SHA: string;
  public readonly Size: number;
  public readonly Type: string;
  public readonly URL: string;
  public readonly Links: IContentNodeLinks;

  constructor(responseData: any) {
    this.DownloadUrl = responseData.download_url;
    this.GitUrl = responseData.git_url;
    this.HTMLUrl = responseData.html_url;
    this.Name = responseData.name;
    this.Path = responseData.path;
    this.SHA = responseData.sha;
    this.Size = responseData.size;
    this.Type = responseData.type;
    this.URL = responseData.url;
    this.Links = {
      Git: responseData._links.git,
      HTML: responseData._links.html,
      Self: responseData._links.self,
    }
  }
}