export interface ContentPreview {
  name: string;
  lastModified: string;
  author: string;
  path: string;
}

export interface GitHubContentResponse {
  name: string;
  path: string;
}

export interface GitHubCommitResponse {
  commit: {
    author: {
      date: string;
      name: string;
    };
  };
}
