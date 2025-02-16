import { ContentPreview, GithubAuthorDetail, GitHubCommitResponse, GitHubContentResponse } from "../types";
import { normalizedPath } from "../util";
import { getGithubData } from "./api";

export function fetchContentPreview(
  data: GitHubContentResponse[],
): Promise<ContentPreview>[] {
  return data.map(async (item: GitHubContentResponse) => {
    const { lastModified, author, author_detail } = await fetchModifyData(item.path);
    return {
      path: item.path,
      name: item.name.split(' - ').slice(1).join(': '),
      lastModified: new Date(lastModified).toLocaleDateString(),
      author: author,
      author_detail: {
        avatar_url: author_detail.avatar_url,
        login: author_detail.login,
        url: author_detail.url,
      },
    };
  });
}

export async function fetchModifyData(
  path: string,
): Promise<{ lastModified: string; author: string ; author_detail: GithubAuthorDetail }> {

  const commitResponse: unknown = await getGithubData(`https://api.github.com/repos/richard483/blogs-content/commits?path=${normalizedPath(path)}&per_page=1`);

  const data = commitResponse as GitHubCommitResponse[];
  return {
    lastModified: new Date(data[0].commit.author.date).toLocaleDateString(),
    author: data[0].commit.author.name,
    author_detail: {
      avatar_url: data[0].author.avatar_url,
      login: data[0].author.login,
      url: data[0].author.url,
    },
  };
}