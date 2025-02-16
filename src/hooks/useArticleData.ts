import { useEffect, useState } from 'react';
import { getData } from '@services/api';
import { ApiBaseResponse } from '@/types/commonApi.types.ts';

function useArticleData(article: string): ApiBaseResponse<string> {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: unknown = await getData<string>(
          `https://raw.githubusercontent.com/richard483/blogs-content/refs/heads/master/blogs/${article}/id.md`,
        );
        setData(data as string);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(error as string);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData().catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('#useArticleData - Error fetching data:', error.message);
        return;
      }
      console.error('#useArticleData - Error fetching data:', error);
    });
  }, [article]);

  return { data, loading, error };
}

export default useArticleData;
