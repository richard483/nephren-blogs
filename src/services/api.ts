import axios from 'axios';
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN as string,
});

async function getData<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url);
  return response.data;
}

async function getGithubData(url: string): Promise<unknown> {
  const response = await octokit.request(url, {
    headers: {
      accept: 'application/vnd.github.v3+json',
      "content-type": "text/plain",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return response.data as unknown;
}

export { getData, getGithubData };
