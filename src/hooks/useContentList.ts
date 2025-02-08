import { useEffect, useState } from 'react';
import { getData } from '@services/api';
import {
  ContentPreview,
  GitHubCommitResponse,
  GitHubContentResponse,
} from '@/types';
import { ApiBaseResponse } from '@/types/commonApi.types.ts';

function useContentList(): ApiBaseResponse<ContentPreview[]> {
  const [data, setData] = useState<ContentPreview[]>(
    new Array<ContentPreview>(),
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: unknown = await getData<GitHubContentResponse[]>(
          'https://api.github.com/repos/richard483/blogs-content/contents/blogs',
        );

        const mappedData: unknown = await Promise.all(
          mapData(data as GitHubContentResponse[]),
        );

        setData(mappedData as ContentPreview[]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(error as string);
        }
        setError(error as string);
      } finally {
        setLoading(false);
      }

      function mapData(
        data: GitHubContentResponse[],
      ): Promise<ContentPreview>[] {
        return data.map(async (item: GitHubContentResponse) => {
          const { name, path } = item;
          const { lastModified, author } = await fetchModifyData(path);
          return {
            path: path,
            name: name.split(' - ').slice(1).join(': '),
            lastModified: new Date(lastModified).toLocaleDateString(),
            author: author,
          };
        });
      }

      async function fetchModifyData(
        path: string,
      ): Promise<{ lastModified: string; author: string }> {
        const normalizedPath = path.replace(/ /g, '%20');

        const commitResponse: unknown = await getData<GitHubCommitResponse[]>(
          `https://api.github.com/repos/richard483/blogs-content/commits?path=${normalizedPath}&per_page=1`,
        );

        const data = commitResponse as GitHubCommitResponse[];
        return {
          lastModified: data[0].commit.author.date,
          author: data[0].commit.author.name,
        };
      }
    };
    fetchData().catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('#useContentList - Error fetching data:', error.message);
        return;
      }
      console.error('#useContentList - Error fetching data:', error);
    });
  }, []);

  return { data, loading, error };
}

export default useContentList;
