import axios from 'axios';
import { Octokit } from 'octokit';
import { GithubResponse } from '../types';

const token = import.meta.env.VITE_GITHUB_TOKEN as string;

if (!token) {
  throw new Error('#api - GitHub token is required');
}

const octokit = new Octokit({
  auth: token,
});

async function getData<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url);
  return response.data;
}

async function getGithubData<T>(url: string): Promise<T> {
  const response = await octokit.request(url, {
    headers: {
      accept: 'application/vnd.github.v3+json',
      "content-type": "text/plain",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return (response as GithubResponse<T>).data;
}

export { getData, getGithubData };
