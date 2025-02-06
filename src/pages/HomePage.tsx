import useContentList from '@/hooks/useContentList';

function HomePage() {
  const contents = useContentList();
  if (contents.loading) {
    return <div>Loading...</div>;
  }
  if (contents.error) {
    return <div>Error: {contents.error.message}</div>;
  }
  return (
    <div>
      <h1>Content List</h1>
      <ul>
        {contents.data.map((item: any, index: number) => (
          <li key={index}>
            {item.name} {item.lastModified} {item.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
