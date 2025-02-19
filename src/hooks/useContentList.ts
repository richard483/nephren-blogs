import { useEffect, useState } from 'react';
import { getGithubData } from '@services/api';
import { ContentPreview, GitHubContentResponse } from '@/types';
import { ApiBaseResponse } from '@/types/commonApi.types.ts';
import { fetchContentPreview } from '../services/githubApi';

function useContentList(): ApiBaseResponse<ContentPreview[]> {
  const [data, setData] = useState<ContentPreview[]>(
    new Array<ContentPreview>(),
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: unknown = await getGithubData(
          'https://api.github.com/repos/richard483/blogs-content/contents/blogs',
        );

        const mappedData: unknown = await Promise.all(
          fetchContentPreview(data as GitHubContentResponse[]),
        ).then((res) => res.sort((a, b) => (a.path < b.path ? -1 : 1)));

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
