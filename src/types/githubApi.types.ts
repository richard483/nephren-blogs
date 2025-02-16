export interface ContentPreview {
  name: string;
  lastModified: string;
  author: string;
  path: string;
  author_detail: GithubAuthorDetail;
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
  author: GithubAuthorDetail;
}

export interface GithubAuthorDetail {
  avatar_url: string;
  login: string;
  url: string;
}

export interface GithubResponse<T> {
  data: T;
}