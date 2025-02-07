import { useEffect, useState } from 'react';
import { getData } from '@services/api';
import { ContentPreview } from '@/types';

function useContentList() {
  const [data, setData] = useState<ContentPreview[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(
          'https://api.github.com/repos/richard483/blogs-content/contents/blogs',
        );
        const mappedData: ContentPreview[] = await Promise.all(mapData(data));
        setData(mappedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

      function mapData(data: []): Promise<ContentPreview>[] {
        return data.map(async (item: any) => {
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

      function fetchModifyData(path: string) {
        const normalizedPath = path.replace(/ /g, '%20');
        return getData(
          `https://api.github.com/repos/richard483/blogs-content/commits?path=${normalizedPath}&per_page=1`,
        ).then((data: any) => {
          return {
            lastModified: data[0].commit.author.date,
            author: data[0].commit.author.name,
          };
        });
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
}

export default useContentList;
