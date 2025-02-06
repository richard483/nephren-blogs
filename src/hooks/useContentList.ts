import { useState, useEffect } from 'react';
import { getData } from '@services/api';

const localCache: { [key: string]: any } = {};

function useContentList() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (localCache['data']) {
        setData(localCache['data']);
        setLoading(false);
        return;
      }
      try {
        const data = await getData(
          'https://api.github.com/repos/richard483/blogs-content/contents/blogs',
        );
        const mappedData = await Promise.all(mapData(data));
        setData(mappedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

      function mapData(data: []) {
        return data.map(async (item: any) => {
          const { name, path } = item;
          const { lastModified, author } = await fetchModifyData(path);
          return {
            name: name.split(' - ').slice(1).join(': '),
            lastModified: new Date(lastModified).toLocaleString(),
            author,
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
